import React, { useState } from "react";
import { IoEye, IoEyeOff } from 'react-icons/io5';

type TextInputProps = {
    label: string;
    text: string;
    star?: boolean;
    setText?: (text: string) => void;
    error?: string;
};

export function TextInputGlobal(props: TextInputProps) {
    const [showPassword, setShowPassword] = useState(!props.star); // Par défaut, affiche le texte si `star` est false

    return (
        <div style={{ width: "100%" }}>
            <label style={{ paddingLeft: 5, display: "block", marginBottom: 4 }}>
                {props.label}
            </label>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "3px solid #3243DF",
                borderRadius: 5,
                paddingLeft: 5,
                paddingRight: 5,
            }}>
                <input
                    style={{
                        flex: 1,
                        color: "#FFFFFF",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        height: 47
                    }}
                    type={props.star && !showPassword ? "password" : "text"}
                    value={props.text}
                    onChange={e => props.setText && props.setText(e.target.value)}
                />
                {props.star && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginLeft: 8 }}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <IoEye size={20} color="#FFFFFF" />
                        ) : (
                            <IoEyeOff size={20} color="#FFFFFF" />
                        )}
                    </button>
                )}
            </div>
            {props.error && (
                <p style={{ color: "#FF4444", fontSize: "0.875rem", marginTop: 4, paddingLeft: 5 }}>
                    {props.error}
                </p>
            )}
        </div>
    );
}
