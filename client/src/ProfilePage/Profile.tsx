import React from "react";
import { Books } from "./Books";
import { Recipes } from "./Recipes";

export function Profile() {
  return (
    <div className="central-content">
      <Books />
      <Recipes />
    </div>
  );
}
