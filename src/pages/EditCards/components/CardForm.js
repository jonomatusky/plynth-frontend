import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const CardForm = ({
  values,
  id,
  validationSchema,
  defaultValues,
  onSubmit,
  children,
}) => {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const [prevCardId, setPrevCardId] = useState(null)

  //ensures the form is rerendered when the index is changed
  useEffect(() => {
    const setReset = () => {
      setPrevCardId(id)
      reset(values)
    }
    if (id && prevCardId !== id) {
      setReset()
    }
  })

  return (
    <form id="card-form" onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { register, errors })
      })}
    </form>
  )
}

export default CardForm
