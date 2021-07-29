import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import './Infobox.css';

function InfoBox({ title,cases,total}) {
    return (
        <div className="infobox__div">
            <Card className="infobox">
                <CardContent>
                    <Typography color="textSecondary">{title}</Typography>
                    <h2>{cases}</h2>
                    <Typography color="textSecondary">{total}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
