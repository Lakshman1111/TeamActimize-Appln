import { TextField } from '@mui/material'
import React from 'react'
function TextFieldComponent({formik, value, ...params }) {
    console.log(params, 'value===================')
  return (
      <TextField
          fullWidth
          variant='filled'
          margin="dense"
          name="start_date"
          value={value}
          {...params}
          error={formik.touched.start_date && Boolean(formik.errors.start_date)}
          helperText={formik.touched.start_date && formik.errors.start_date}
      />
  )
}
export default TextFieldComponent