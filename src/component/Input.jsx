export default function Input({rules,id,errors,label,register}){
    return (<>
        <label htmlFor={id} className="form-label">{label}</label>
        <input 
          id={id} 
          name={id} 
          type={id} 
          className={`form-control ${errors[id] && 'is-invalid'}`}
          {...register(id,rules)}
          placeholder={`請輸入 ${label}`} />
          {
            errors[id] && <div className="invalid-feedback">{errors?.[id]?.message}</div>
          }
    </>)
}