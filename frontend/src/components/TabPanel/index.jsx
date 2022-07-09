/** 
 * @param {{value: number; index: number}} props 
 * */
 export const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div>
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}