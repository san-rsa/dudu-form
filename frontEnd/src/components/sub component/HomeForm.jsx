import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/admin/HomeForm.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, Inputs } from "./list/Generallist";


const HomeForm = ({teamid, event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()

  console.log(data);
  




    //     useEffect(() => {
    //       if (!typeId) {
    //         fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
    //         .then((res) =>  res.json())
    //         .then((data) =>  setInputs(values => ({...values, teamid: data.name}))
    //       );
    //       }

    //     }, []);



    //     useEffect(() => {
    //       if (typeId) {
    //         fetch(process.env.REACT_APP_API_LINK  + "getone/player/" + typeId.replaceAll('-',' '))
    //         .then((res) =>  res.json())
    //         .then((data) =>  setInputs({
    //           fname:data.name.first,
    //           lname: data.name.last,
    //           position: data.position,
    //           dob: data.dob.slice(0, 10), 
    //           img: data.picture.url, 
    //           teamid: data.teamId
              
              
    //         })
    //       );
    //       }       

    //     if (event?.add ) {
    //   setFetch({link: 'admin/add/player/', method: 'POST'  })
    // } else if (event?.edit) {
    //   setFetch({link: 'admin/edit/player/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    // }

    //   }, []);
        




    // const h1 = (event?.add) ? "Add Player" : (event?.edit) ? "Edit Player" : "please try again later" ;  
    
    const h1 = "SUMMITSAGE ESTATES INVESTMENT AND MANAGEMENT APPLYING APPOINTMENT APPLICATION FORM"
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    
      const handleFileChange = (event) => {
        setFile(event.target.files)
      };



          console.log(data, img);
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    
        Array.from(img).forEach(imgs => {
    
          formData.append('img', imgs);
    
      });
    
            formData.append('data',  JSON.stringify(data));


            if (data.rules == "no") {
              return AlertError("you didn't accept the rules and regulations kindly cancel or accept")

            }
    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + fetchs.link, {
        method: fetchs.method,
        // credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })


        
        .then((res) => {
           if (res.status == 200) {

            const link =teamid.replaceAll(' ','-')

          
                navigate("/user"); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(false)
            AlertError(e)

          let msg = "fail"
        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>





        <form className={Style.form} onSubmit={HandleSubmit}>
          <div className={Style.top} >
            <h1 > {h1} </h1>
          </div>

          <h6 > add text </h6>

        <Inputs label={'City of the property you are applying for* '} type={'text'} name={'city'} onchange={handleChange} value={data.city}  placeholder={'City of the property you are applying for'} disabled={false} required={true}  />

        <div className={Style.half_inp} > 
          <Inputs label={'Applicant convenient viewing time'} type={'date'} name={'app_date'} onchange={handleChange} value={data.app_date} disabled={false} required={true}  />

        </div>


          <h3> Full name </h3>

        <div className={Style.name} > 

          <div className={Style.half_inp} > 
            <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
          </div>

          <div className={Style.half_inp} >         
            <Inputs label={'last name'} type={'text'} name={'lname'} onchange={handleChange} value={data.lname}  placeholder={'last name'} disabled={false} required={true}  />

          </div>
        </div>


        <Inputs name="email" type={"email"} onchange={handleChange} value={data.email} placeholder={"your email "} label={"email"}  disabled={false} required={true} />
        
        <Inputs label={'Applicant current address '} type={'text'} name={'address'} onchange={handleChange} value={data.address}  placeholder={'Applicant current address'} disabled={false} required={true}  />

        <Inputs label={'Phone number'} type={'number'} name={'phone'} onchange={handleChange} value={data.phone}  placeholder={'Phone number'} disabled={false} required={true}  />


        <Inputs label={'date of birth'} type={'date'} name={'dob'} onchange={handleChange} value={data.dob} disabled={false} required={true}  />

        <Inputs label={'Applicant state of origin'} type={'text'} name={'origin'} onchange={handleChange} value={data.origin}  placeholder={'Applicant state of origin'} disabled={false} required={true}  />




          <h6 > EMPLOYMENT DETAILS 👇👇👇 </h6>


 

       <div className={Style.select} >


        <label >Employment status</label>

          <select id="employment" name={"employment"} onChange={handleChange} title="employment" Value={data.employment} required >

          { data.employment ? null : <option value={""} > Employment status  </option> }



              <option  value={"employed"} > employed  </option>
              <option  value={"self-employed"} > self-employed  </option>
              <option  value={"unemployed"} > unemployed  </option>
              <option  value={"retired"} > retired  </option>

          </select>

        </div>




        <Inputs label={'Monthly income from employment '} type={'number'} name={'income_month'} onchange={handleChange} value={data.income_month} placeholder={'Monthly income from employment '} disabled={false} required={true}  />
        
        <Inputs label={'Annual Income from employment '} type={'number'} name={'income_year'} onchange={handleChange} value={data.income_year} placeholder={'Annual Income from employment '} disabled={false} required={true}  />
        


          <h6 > residential status 👇👇👇 </h6>

        <div className={Style.select} >


        <label >Applicant current residential status </label>

          <select id="status" name={"status"} onChange={handleChange} title="status" Value={data.status} required>

          { data.status ? null : <option value={""} > select martial status  </option> }



              <option  value={"living with family"} > living with family  </option>
              <option  value={"private tenant"} > private tenant  </option>
              <option  value={"council tenant "} > council tenant   </option>
              <option  value={"others"} > others  </option>

          </select>


          { (data.status !== "others") ? null : <Inputs label={'Other applicant current residential status '} type={'number'} name={'income_month'} onchange={handleChange} value={data.income_month} placeholder={'Monthly income from employment '} disabled={false} required={true}  /> }


        </div>



          <div className={Style.select} >


        <label >Desire Length </label>

          <select id="length" name={"length"} onChange={handleChange} title="length" Value={data.length} required>

          { data.length ? null : <option value={""} > select desire length  </option> }



              <option  value={"month to month"} > month to month  </option>
              <option  value={"3 months"} > 3 months  </option>
              <option  value={"6 months"} > 6 months   </option>
              <option  value={"9 months"} > 9 months  </option>
              <option  value={"12 months"} > 12 months  </option>


          </select>
        </div>        
        
        
        <div className={Style.select} >


        <label >Do you smoke?  </label>

          <select id="smoke" name={"smoke"} onChange={handleChange} title="smoke" Value={data.smoke} required >

          { data.smoke ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>   


        <div className={Style.select} >


        <label >Do you have guarantor?   </label>

          <select id="guarantor" name={"guarantor"} onChange={handleChange} title="guarantor" Value={data.guarantor} required >

          { data.guarantor ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>  


        <div className={Style.select} >


        <label >Do you have any children under 18 years old? </label>

          <select id="children_minor" name={"children_minor"} onChange={handleChange} title="children_minor" Value={data.children_minor} required>

          { data.children_minor ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>  



        <div className={Style.select} >


        <label >Do you intend to keep pet?  </label>

          <select id="pet" name={"pet"} onChange={handleChange} title="pet" Value={data.pet} required >

          { data.pet ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>   

        <Inputs label={'How many people will be living in the unit'} type={'number'} name={'people_will_be_living_in_the_unit'} onchange={handleChange} value={data.people_will_be_living_in_the_unit}  placeholder={'How many people will be living in the unit'} disabled={false} required={true}  />


        <Inputs label={'How do you plan to use your new home?'} type={'text'} name={'how_do_you_plan_to_use_your_new_home'} onchange={handleChange} value={data.how_do_you_plan_to_use_your_new_home }  placeholder={'How do you plan to use your new home? '} disabled={false} required={true}  />

    
        <div className={Style.select} >


        <label >Do you have bankruptcy or foreclosure in past 3 years?   </label>

          <select id="bankruptcy_in_past_3years" name={"bankruptcy_in_past_3years"} onChange={handleChange} title="bankruptcy_in_past_3years" Value={data.bankruptcy_in_past_3years} required>

          { data.bankruptcy_in_past_3years ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>  


        <div className={Style.select} >


        <label >Have you ever been guilty of felony? </label>

          <select id="felony" name={"felony"} onChange={handleChange} title="felony" Value={data.felony} required>

          { data.felony ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>  



        <div className={Style.select} >


        <label >Have you broken a lease?  </label>

          <select id="broken_lease" name={"broken_lease"} onChange={handleChange} title="broken_lease" Value={data.broken_lease} required>

          { data.broken_lease ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>  



        
        
 

        <Inputs label={'How much will you be able to pay for deposit if your application was approved? '} type={'number'} name={'deposit'} onchange={handleChange} value={data.deposit}  placeholder={'How much will you be able to pay for deposit if your application was approved?'} disabled={false} required={true}  />

       <Inputs label={'Upload a copy of your identity,if you are not with it or you don’t feel comfortable you can submit the application form! '} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />


      


          <h6 > description </h6>

          <div className={Style.checkbox} > 
              <input type={'checkbox'} name={'picture'} onchange={handleChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

          <label >Required I confirm that all information provided in this pre-tenancy questionnaire is accurate and truthful  </label>

              
          </div>

                    <div className={Style.checkbox} > 
              <input type={'checkbox'} name={'picture'} onchange={handleChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

          <label > I declared that the information i have provided is true and correct and hereby you to verify the details given.  </label>

              
          </div>          
          
          <div className={Style.checkbox} > 
              <input type={'checkbox'} name={'picture'} onchange={handleChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

          <label >I understand that under the Tenant Fees Act 2019 providing false and or misleading information on this form will lead to the retention. </label>

              
          </div>          
          
          <div className={Style.checkbox} > 
              <input type={'checkbox'} name={'picture'} onchange={handleChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

          <label >Required I agree to make the payment for appliaction fees of $60 immediately i submited my application.  </label>

              
          </div>

            <div className={Style.checkbox} > 
              <input type={'checkbox'} name={'picture'} onchange={handleChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

          <label >Please cash/check is not acceptable for the refundable application form of $60  </label>

              
          </div>

          <div className={Style.checkbox} > 
              <input type={'checkbox'} name={'picture'} onchange={handleChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

          <label >Don’t submit the Application form if you are not ready to make the application fees or you don’t feel comfortable. </label>

              
          </div>


                    <div className={Style.checkbox} > 
              <input type={'checkbox'} name={'picture'} onchange={handleChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

          <label >I agree to pay my refundable application fee of $60 immediately i submit my application form..  </label>

              
          </div>

          


          

        <div className={Style.select} >


        <label >Do you agree to the rules and regulations of this Application form?  </label>

          <select id="rules" name={"rules"} onChange={handleChange} title="rules" Value={data.rules} required>

          { data.rules ? null : <option value={""} > select an answer  </option> }

              <option  value={"yes"} > yes  </option>
              <option  value={"no"} > no  </option>

          </select>

        </div>  


        
          <Inputs label={'Signature'} type={'text'} name={'signature'} onchange={handleChange} value={data.signature} placeholder={'your signature  '} disabled={false} required={true}  />





        <button className="submit"  disabled={submitbtn} type="submit"> Submit</button> 
        </form>

    </div>

    )
}





export  {HomeForm, }