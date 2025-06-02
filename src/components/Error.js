function Error(params) {
  const text = params.text;
  const errorClass = params.errorClass;

  return (
    <div className="error">
      <h4 className={errorClass}>{text}</h4>
    </div>
  );
}

export default Error;
