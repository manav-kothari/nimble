import React from "react";
import { Button, Card } from "react-bootstrap";

const ManageMenuCard = ({ user }) => {
  return (
    <Card className="my-2 p-1 rounded bg-white cards text-dark text-center letter">
      <h4 className="mt-2 mb-1 text-capitalize letter">
        <strong>{user.name}</strong>
      </h4>

      <Button
        href={`/superadmin/products/${user._id}`}
        className="btn-outline-success py-2 px-1 m-2 text-capitalize rounded"
      >
        Manage Menu
      </Button>
      <Button
        href={`/superadmin/profile/${user._id}`}
        className="btn-outline-danger py-2 px-1 m-2 text-capitalize rounded"
      >
        Manage Profile
      </Button>
    </Card>
  );
};

export default ManageMenuCard;
