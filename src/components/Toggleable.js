import { useState, useImperativeHandle, forwardRef } from "react";

const Toggleable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const getVisibility = () => {
        return visible
    }

    useImperativeHandle(ref, () => {
        return {toggleVisibility, getVisibility}
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>
                    {props.hideLabel || 'cancel'}
                </button>
            </div>
        </>
    )
})

export default Toggleable