import axios from "axios";
import bcrypt from 'bcryptjs';
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";

export const getIPAddress = async () => {
  try {
    const res = await axios.get("https://geolocation-db.com/json/");
    return res.data.IPv4;
  } catch (error) {
    console.log(error);
  }
};

export const checkDomainAndHandleCases = async (values, id) => {
  try {
    const domain = values.email.split("@")[1];
    let matchedDomain = null;

    const querySnapshot = await getDocs(collection(db, "domains"));
    querySnapshot.forEach((doc) => {
      if (doc.data().domain === domain) {
        matchedDomain = doc.data();
      }
    });

    if (!matchedDomain) {
      // Scenario 4: Create record in users and temp_users collection

      let user = await addDoc(collection(db, "users"), {
        fname: values.firstName,
        lname: values.lastName,
        user_email: values.email,
        role: "student",
        date_created: Timestamp.fromDate(new Date()),
        guid: id,
        verify: false,
      });

      let temp_user = await addDoc(collection(db, "temp_users"), {
        guid: user.id,
        allowed: "P",
        date_start: Timestamp.fromDate(new Date()),
      });

      return true;
    } else {
      if (matchedDomain.allowed === "Y") {
        // Scenario 1: Create record in users collection
        await addDoc(collection(db, "users"), {
          fname: values.firstName,
          lname: values.lastName,
          user_email: values.email,
          role: "student",
          date_created: Timestamp.fromDate(new Date()),
          guid: id,
          verify: false,
        });
        return true;
      } else if (matchedDomain.allowed === "N") {
        // Scenario 2: Delete user from auth
        let user = getAuth().currentUser;
        user.delete();
        // TODO: Send email to Admin
        return false;
      } else if (matchedDomain.allowed === "P") {
        // Scenario 3: Create record in users collection
        await addDoc(collection(db, "users"), {
          fname: values.firstName,
          lname: values.lastName,
          user_email: values.email,
          role: "student",
          date_created: Timestamp.fromDate(new Date()),
          guid: id,
          verify: false,
        });
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserDoc = async (userCredential) => {
  let user = null;

  // Get User from users collection
  const userQuery = await query(
    collection(db, "users"),
    where("guid", "==", userCredential.user.uid)
  );

  const querySnapshot = await getDocs(userQuery);
  querySnapshot.forEach(async (docSnap) => {
    user = {
      id: docSnap.id,
      ...docSnap.data(),
    };
  });
  return user;
};

export const createDBLogs = async (values, user) => {
  const currentIP = await getIPAddress();

  if (values && currentIP) {
    let { id } = user;

    // Get User from user_login_log collection
    const userLogQuery = await query(
      collection(db, "user_login_log"),
      where("guid", "==", id)
    );
    const querySnapshot = await getDocs(userLogQuery);

    // Update Log
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((docSnap) => {
        let data = docSnap.data();
        updateDoc(doc(db, "user_login_log", docSnap.id), {
          ...data,
          login_details: [
            ...data.login_details,
            {
              ip: currentIP,
              date_time: Timestamp.fromDate(new Date()),
            },
          ],
        });
      });
    } else {
      addDoc(collection(db, "user_login_log"), {
        guid: id,
        login_details: [
          {
            ip: currentIP,
            date_time: Timestamp.fromDate(new Date()),
          },
        ],
      });
    }
  }
};

export const checkDomainAccess = async (values, user) => {
  const domain = values.email.split("@")[1];
  let matchedDomain = null;
  let access = '';

  const querySnapshot = await getDocs(collection(db, "domains"));
  querySnapshot.forEach((doc) => {
    if (doc.data().domain === domain) {
      matchedDomain = doc.data();
    }
  });

  if (!matchedDomain) {
    let temp_user = null;

    const userQuery = await query(
      collection(db, "temp_users"),
      where("guid", "==", user.id)
    );

    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((docSnap) => {
      temp_user = docSnap.data();
    });

    if(!temp_user){
      access = '';
    } else {
      access = verifyAccess(temp_user, user, false);
    }
  } else {
    access = verifyAccess(matchedDomain, user, true);
  }
  return access;
};               

export const verifyAccess = ({ allowed, date_start, date_end }, user, fromDomainList) => {
  date_start = date_start ? date_start.toDate() : null;
  date_end = date_end ? date_end.toDate() : null;

  let access = allowed;
  
  if(fromDomainList){

    if (access === "Y") {
      // Dates Case
      const currentDate = new Date();

      if (!date_start && !date_end) {
        access = "Y";
      } else {
        if (currentDate > date_start && currentDate < date_end) {
          access = "Y";
        } else {
          access = "P";
        }
      }
    }
  }
  return access;
};

export const hashPwd = (password) => {
  return bcrypt.hashSync(password, 10);
}