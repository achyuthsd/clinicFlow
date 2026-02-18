function FormattedDateIST({ value }) {
  const date = new Date(value);

  return (
    <span>
      {date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })}
    </span>
  );
}

export default FormattedDateIST;
