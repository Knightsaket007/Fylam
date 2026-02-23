
const AddNewField = () => {

  const addNewField = () => {
  const id = generateId();

  setFields(prev => ({
    ...prev,
    [id]: {
      x: 100,
      y: 100,
      width: 150,
      height: 40,
      text: "New Text",
    }
  }));
};
  return (
    <>
    
    <div className="bg-blue-300 rounded-full">
        New
    </div>

    </>
  )
}

export default AddNewField