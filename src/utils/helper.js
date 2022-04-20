import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, getDocs, query, Timestamp, updateDoc, where, limit, startAt, orderBy, startAfter } from "firebase/firestore";
import { toast } from "react-toastify";         
import { db, auth, storage } from "../firebase";
import { CASE_LIMIT } from "../constants";                  
              
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
        let user = auth.currentUser;
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
      
  const cred = await userCredential;

  let authId;
  if(cred.user || cred.currentUser){
    authId = cred.user ? cred.user.uid : cred.currentUser.uid;
  }
  
  // Get User from users collection
  const userQuery = query(
    collection(db, "users"),
    where("guid", "==", authId)
  );

  const querySnapshot = await getDocs(userQuery);
  querySnapshot.forEach(async (docSnap) => {
      user = {
        id: docSnap.id,
        ...docSnap.data(),
      };
  });

  if(user){
    let image = await getUserProfilePic(user.id);
    if(image){
      user = {
        ...user,
        image
      }
    }
  }
  
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

export const validateFirebaseLink = async (body) => {
  try {
    
    const passResetUrl = `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    if(body.password){
      body = {
        oobCode: body.code,
        newPassword: body.password,
      }
    } else {
      body = {  
        oobCode: body.code,  
      }
    }

    const res = await fetch(passResetUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();
    return data;
  } catch (error) {
    toast.error('Oops!! Link has expired')
    return false;
  }
}     

export const updateUserDocument = async (body) => {
  try {
    let user = await getUserDoc(auth);     

    if(user){
      await updateDoc(doc(db, "users", user.id), body)
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updateProfilePic = async (user, pic) => {
  try {
    let storageRef = ref(storage, `/user-profile/${user.id}`);
    let uploaded = await uploadBytes(storageRef, pic)
     
    if(uploaded){
      let image = await getUserProfilePic(user.id);
      return image;
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
    return false;
  }
}

export const getUserProfilePic = async (id) => {
  try {
    const profilePic = await getDownloadURL(ref(storage, `/user-profile/${id}`))

    if(profilePic){
      return profilePic;
    } else {
      return '';
    }
  } catch (error) {
    console.log(error);
    return '';
  }
}

export const getDataFromCollection = async (coll, filter = null) => {
  try {

    let Query; 

    const count = await getCollectionDocCounts(coll, filter);

    if(filter){
      if(filter.value !== ''){
        Query = query(                
          collection(db, coll),  
          where(filter.key, "==", filter.value),
          orderBy(filter.orderBy),                         
          startAt(filter.startAt),
          limit(CASE_LIMIT),       
        ); 
      } else {
        Query = query(                
          collection(db, coll),  
          orderBy(filter.orderBy),                         
          startAt(filter.startAt),
          limit(CASE_LIMIT),       
        ); 
      }                      
    } else {                      
      Query = query(
        collection(db, coll)
      );
    }                          
    
    const querySnapshot = await getDocs(Query);

    // let attemptedCase;
    const data = [];                                 
    querySnapshot.forEach((doc) => {
      // attemptedCase = getAttemptedCaseDoc({ id: doc.data().case_id, user: filter.user });      
      
      // if(attemptedCase){
      //   doc = { ...doc.data(), attempted: true }
      // } else {
      //   doc = doc.data();
      // }

      data.push(doc.data())
    });                        

    return { data, count };                                        
  } catch (error) {    
    console.log(error);
  }
}

export const calculatePagination = async (coll, filter) => {
  try {
    
    const perPageData = [];

    const pages = Math.ceil(filter.count / CASE_LIMIT);

    let snap;
      for(let i = 1; i <= pages; i++){
        if(filter.value !== ''){
          snap = await getDocs(query( 
            collection(db, coll),       
            where(filter.key, "==", filter.value),
            orderBy(filter.orderBy),                               
            startAfter(perPageData.length > 0 ? perPageData[perPageData.length - 1].end : ''),         
            limit(CASE_LIMIT),                       
          ));
        } else {
          snap = await getDocs(query( 
            collection(db, coll),       
            orderBy(filter.orderBy),                               
            startAfter(perPageData.length > 0 ? perPageData[perPageData.length - 1].end : ''),         
            limit(CASE_LIMIT),                       
          ));
        }
      
        let d = [];
        snap.forEach((doc) => {
          d.push(doc.data())          
        });

        perPageData.push({
          index: i,                
          start: d[0].case_id,
          end: d[d.length - 1].case_id
        });
      }

      return perPageData;
  } catch (error) {
    console.log(error);
  }
}

export const getCollectionDocCounts = async (coll, filter = null) => {
  try {
    let Query;

    if(filter && filter.value !== ''){
      Query = query(
        collection(db, coll), 
        where(filter.key, "==", filter.value)
      );
    } else {
      Query = query(
        collection(db, coll), 
      );
    }  

    const count = (await getDocs(Query)).size;
    return count;
  } catch (error) {  
    console.log(error);    
  }
}                             

export const createStudentLog = async (data) => {
  try {
    const created = await addDoc(collection(db, "student_log"), data);
    return created ? true :  false;
  } catch (error) {
    console.log(error);
  }
}

export const getAttemptedCaseDoc = async (data) => {
  try {
    let existingCase = null;

    let Query = query(
      collection(db, "student_log"), 
      where("case_id", "==", data.id),
      where("user_id", "==", data.user),
    )

    const snap = await getDocs(Query);
    snap.forEach(async doc => {
      existingCase = doc.data();
    })

    return existingCase;
  } catch (error) {
    console.log(error);
  }
}

export const setInitialCaseValues = (body) => {
  const { attemptedC, setFindingValues, setLocationValues, setImpressions, diseases } = body;

  for(let key in attemptedC){
    if(key.includes("_entered")){
      if(key.split("_entered")[0] === 'location'){
        setLocationValues(attemptedC[key])
        delete attemptedC[key];
      } else if(key.split("_entered")[0].startsWith("acceptable_diagnosis")) {
        setImpressionsValues(key.split("_entered")[0], attemptedC[key], setImpressions, diseases, attemptedC)
        delete attemptedC[key];
      } else {
        setFindingValues(prev => ({
          ...prev,
          [key.split("_entered")[0]]: attemptedC[key]
        }))
      }
    }
  }
}

const setImpressionsValues = (key, value, setImpressions, diseases, attemptedC) => {
  let localKey = key === "acceptable_diagnosis1" ? "first" : key === "acceptable_diagnosis2" ? "second" : "third"

  let link = diseases.data.filter((dis) =>
  dis.disease_name.toLowerCase() === (value.toLowerCase()))[0]?.disease_reference;

  setImpressions(prev => ({
    ...prev,
    [localKey]: {
      value, 
      link: link ? link : '',
      result: attemptedC[`${key}_eval`]
    }
  }))
}