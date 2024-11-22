import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

function ContentTabs() {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabSwitch = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <TabContext value={currentTab}>
      <TabList
        onChange={handleTabSwitch}
        aria-label="Main Content Tabs"
        indicatorColor="secondary"
        textColor="secondary"
        // variant="fullWidth"
        // centered
      >
        <Tab value={0} label="ALL" />
        <Tab value={1} label="BLOGS" />
        <Tab value={2} label="PROJECTS" />
        <Tab value={3} label="GOSSIPS" />
      </TabList>
      <TabPanel value={0}>Item 000</TabPanel>
      <TabPanel value={1}>Item 111</TabPanel>
      <TabPanel value={2}>Item 222</TabPanel>
      <TabPanel value={3}>Item 333</TabPanel>
    </TabContext>
    // <Box>
    //   <Tabs value={currentTab} onChange={handleTabSwitch}>
    //     <Tab label="Item 1" />
    //     <Tab label="Item 2" />
    //     <Tab label="Item 3" />
    //   </Tabs>
    //   < value={value} index={0}>
    //     Content for Tab One
    //   </TabPanel>
    //   <TabPanel value={value} index={1}>
    //     Content for Tab Two
    //   </TabPanel>
    //   <TabPanel value={value} index={2}>
    //     Content for Tab Three
    //   </TabPanel>
    // </Box>
  );
}
export default ContentTabs;
