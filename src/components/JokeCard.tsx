import * as React from "react";

interface CardProps {
    Image: string
    Body: string
}

export const Card: React.FC<CardProps> = 
    ({ Image, Body }) => (
        <div className="card"> 
            <div className="image">
                <img src={Image} alt=""/>
            </div>
            <div className="body">{Body}</div>
        </div>
    )