import React from "react";
import { Link } from "react-router-dom";

export default function LinksList({ links }) {
  if (!links.length) {
    return <p className="center">There Are no Links Yet...</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Ogirinal Link</th>
          <th>Minified Link</th>
          <th>Open Link</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/details/${link._id}`}>Open Link</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
