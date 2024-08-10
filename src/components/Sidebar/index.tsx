import Select from "react-select";

interface IProps {
  playlists: Array<{ name: string; id: string }>;
}

const Sidebar: React.FC<IProps> = ({ playlists }) => {
  console.log(playlists);

  const styles = {
    menuList: (styles: any) => {
      return {
        ...styles,
        maxHeight: "25vh",
      };
    },
    option: (styles: any, { isFocused }: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333",
      };
    },
  };

  const handleChange = (e: any) => {
    console.log(e.id);
  };

  return (
    <>
      <Select
        options={playlists}
        getOptionLabel={(e: any) => e.name}
        styles={styles}
        onChange={handleChange}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "grey",
            primary50: "grey",
            primary75: "black",
            neutral0: "white",
            neutral5: "black",
            neutral10: "white",
            neutral20: "black",
            neutral30: "white",
            neutral40: "black",
            neutral50: "grey",
            neutral60: "black",
            neutral70: "white",
            neutral80: "black",
            neutral90: "white",
            neutral100: "white",
          },
        })}
      />
    </>
  );
};

export default Sidebar;
