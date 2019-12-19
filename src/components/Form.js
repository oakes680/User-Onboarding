import React, {useState, useEffect} from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const FormA = ({values, errors, touched, status}) => {

  const[users, setUsers] = useState([])
 
  useEffect(() => {
    status && setUsers(user => [...user, status])
  }, [status])
  return (
    <div className="animal-form">
      
      <Form >
        <label htmlFor="name"> Name: </label>
        <Field type='text' id='name' name='name' placeholder='name'/>
        {touched.name && errors.name && (<p>{errors.name}</p>)}
        
        <label htmlFor="email"> Email: </label>
        <Field type='email' id='email' name='email' placeholder='banana@look.com' />
        {touched.email && errors.email && (<p>{errors.email}</p>)}
        
        <label htmlFor="password"> Password: </label>
        <Field type='password' id='password' name='password' placeholder='password' />
        {touched.password && errors.password && (<p>{errors.password}</p>)}
        
        <label htmlFor="checkbox"> Check to Agree: </label>
        <Field type='checkbox' id='checkbox' name='check' checked={values.check} />
        
        <button type='submit'>Submit!</button>
      </Form>
      
    {users.map(users => {
      return <ul key={users.id}>
          <li>Name: {users.name}</li>
          <li>Email: {users.email}</li>
      </ul>

    })}

    </div>
  );

}

const FormikForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || '',
      email: props.email || '',
      password: props.password || '',
      check: props.check || false
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required('yo put wtf are you doing'),
    password: Yup.string().required('yo put wtf are you doing'),
    check: Yup.boolean([true], 'come on bro sign your life away')

  }),
  handleSubmit(values, {setStatus, resetForm}){
    axios.post('https://reqres.in/api/users', values)
    .then(res => {
      console.log('success', res)
      setStatus(res.data)
      resetForm()
    })
    .catch(err => console.log(err.res))
  }
  

})(FormA)
export default FormikForm



