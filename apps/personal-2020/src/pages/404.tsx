import Image from "next/image";

export default function Custom404() {
  return (
    <div
      style={{ display: "flex", textAlign: "center", justifyContent: "center" }}
    >
      <h1>
        404
        <br />
        Page Not Found
      </h1>
      <Image
        alt="Not found"
        src="/not-found.gif"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
