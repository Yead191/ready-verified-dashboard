import { Button } from "antd";
import React from "react";
interface PrimaryButtonProps {
  size?: "large" | "middle" | "small";
  text: string;
  handleEvent?: any;
  fullWidth?: boolean;
}
export default function PrimaryButton({
  size,
  text,
  handleEvent,
  fullWidth,
}: PrimaryButtonProps) {
  return (
    <Button
      onClick={handleEvent}
      style={{
        backgroundColor: "#1a5fa4",
        color: "white",
        border: "none",

        width: fullWidth ? "100%" : "auto",
      }}
      size={size}
    >
      {text}
    </Button>
  );
}
