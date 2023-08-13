import React from 'react';
import { Button } from '@mui/material';

interface Props {
  name: string;
  description: string;
  price: number;
  pictureCaption: string;
  pictureURL: string;
  onClickBuy: () => void;
}

const ProductCard = (props: Props) => {
  return (
    <>
      <div
        style={{
          margin: 16,
          paddingBottom: 16,
          borderBottom: "1px solid gray",
        }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "33%", marginRight: 8 }}>
            <img
              style={{ width: "100%" }}
              src={props.pictureURL}
              alt={props.name}
            />
          </div>

          <div style={{ width: "66%" }}>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <strong>{props.price} Test-π</strong> <br />
          <Button variant="outlined" size="small" onClick={props.onClickBuy}>Order</Button>
        </div>

        <span style={{ fontSize: "0.6em" }}>{props.pictureCaption}</span>
      </div>
    </>
  );
};

export default ProductCard;
