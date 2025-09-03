"use client";
import { Button, Card, Grid, Typography } from "antd";
import Link from "next/link";
const { Title, Text } = Typography;

export default function UpdateSuccessPage() {
  const { lg } = Grid.useBreakpoint();

  return (
    <div className=" ">
      {/* Right Side - Form */}
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: lg ? "20px" : "0px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title
            level={2}
            style={{
              margin: "0 0 8px 0",
              color: "#1f2937",
              fontSize: lg ? "28px" : "24px",
            }}
          >
            You’re All Set!
          </Title>
          <Text style={{ color: "#6b7280", fontSize: lg ? "16px" : "14px" }}>
            Your password has been successfully updated.
          </Text>
        </div>
        <Link
          href={"/auth/login"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            style={{
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#1A5FA4",
              borderColor: "#1A5FA4",
              fontSize: "16px",
              fontWeight: "500",
              width: "100%",
            }}
          >
            Login →
          </Button>
        </Link>
      </Card>
    </div>
  );
}
