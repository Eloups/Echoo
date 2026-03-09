'use client';

import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./BtnConnexion.module.css";

type BtnConnexionProps = {
    title: string;
    onClick?: () => void;
    isLoading?: boolean;
};

export function BtnConnexion(props: BtnConnexionProps) {
    return (
        <button
            className={styles.btn}
            style={{
                backgroundColor: "#3243DF",
                opacity: props.isLoading ? 0.8 : 1,
                cursor: props.isLoading ? "not-allowed" : "pointer",
            }}
            onClick={props.isLoading ? undefined : props.onClick}
            disabled={props.isLoading}
        >
            {props.isLoading ? (
                <div className={styles.spinner}>
                    <AiOutlineLoading3Quarters size={20} color="#ffffff" />
                </div>
            ) : (
                <span style={{ color: "#ffffff", fontSize: "1.125rem" }}>
                    {props.title}
                </span>
            )}
        </button>
    );
}