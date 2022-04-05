import React, { useEffect, useRef, useState } from "react";
import './profile.css';                      
import { EditProfileIconSVG } from "../../assets/svgComponents";
import Header from "../../components/Header";   
import EditProfile from "../../components/Form/EditProfile";
import { updateProfilePic } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";   
import { updateUser } from "../../redux/action/auth";

const Profile = () => {      

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const imgRef = useRef();    
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');    

  const handleImage = () => {   
    imgRef.current.click();   
  }

  useEffect(() => {
    if(user.image){                            
      setPreview(user.image);
    }
  }, [user])

  useEffect(() => {     
    if(file){                         
      setPreview(URL.createObjectURL(file))
      checkFileUpload();             
    }                                   
  }, [file])                            
                        
  const checkFileUpload = async () => {
    const image = await updateProfilePic(user, file);
    if(image){               
      dispatch(updateUser({ image }))
      toast.success('Profile picture updated success')
      setFile('')
    } else {               
      toast.error('Something went wrong')
    }                           
  }

  return (
    <>
      <Header />
      <section className="body">
        <div className="container">
          <div className="row">
            <div className="inner-wrap col-lg-6 bg-white mx-auto profile">
              <div className="wrap">
                <div className="text-center">
                  <input    
                    type="file" 
                    ref={imgRef} 
                    className="d-none" 
                    onChange={e => {
                      setFile(e.target.files[0])
                    }}                                    
                  />         
                  <div onClick={handleImage}>
                    {                      
                      preview              
                      ?                     
                      <img src={preview} alt="" className="rounded rounded-circle" height={80} width={80} />
                      :
                      <EditProfileIconSVG />
                    }               
                  </div>
                </div>     
                <EditProfile />
              </div>
            </div>
          </div>                        
        </div>                                 
      </section>
    </>
  );
};

export default Profile;
