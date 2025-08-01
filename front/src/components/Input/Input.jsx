import style from "./Input.module.css"

const Input=({name,type,body,onChange,onBlur})=>{

    return(
        <div className={style.Input}>
            <label htmlFor={name}>{body}</label>
            <input className={style.CampoInput} id={name} name={name} type={type} onChange={onChange} onBlur={onBlur} min={body === "Dia:" ? new Date(Date.now() + 86400000).toISOString().split("T")[0] : undefined} max={name === "birthdate" ? new Date().toISOString().split("T")[0] : undefined}/>
        </div>

    )
}

export default Input