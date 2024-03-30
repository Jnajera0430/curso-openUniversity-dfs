const Form = ({ value, handleOnChange }) => {
    return <div>
        find countries <input type="text" value={value} onChange={handleOnChange} />
    </div>
}

export default Form