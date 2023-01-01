import React from "react";
import { Button, Card } from "react-bootstrap";

const Cards = ({ user }) => {
  return (
    <Card className="my-2 p-1 rounded bg-white cards text-dark text-center letter">
      <h4 className="mt-2 mb-1 text-capitalize letter">
        <strong>{user.name}</strong>
      </h4>
      <span className="my-1">Phone: {user.number}</span>

      <Button
        href={`/menu/${user._id}`}
        className="py-2 px-1 m-2 text-capitalize rounded"
      >
        See Menu
      </Button>
    </Card>
  );
};

export default Cards;
