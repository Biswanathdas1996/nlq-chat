import React from "react";
import WelcomeChatComp from "../../components/WelcomeChatComp";

import Loader from "../../components/Loader";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAlert } from "../../hook/useAlert";
import AceEditor from "react-ace";

// Import a theme and language
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import CreateUserStory from "./components/CreateUserStory";
import CreateTestCases from "./components/CreateTestCases";
import CreateTestData from "./components/CreateTestData";

const Chat: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [userStory, setUserStory] = React.useState<string | null>(null);
  const [testCase, setTestCase] = React.useState<string | null>(null);
  const [testData, setTestData] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);
  const { triggerAlert } = useAlert();

  const [age, setAge] = React.useState("");
  const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
  const taskId = urlParams.get("task");

  const saveDataToLocalStorage = () => {
    const data = [
      {
        id: new Date().getTime(),
        sprint: "backlog",
        userStory,
        testCase,
        testData,
        code,
      },
    ];

    const backlogData = localStorage.getItem("backlogData");

    if (backlogData) {
      if (taskId) {
        const parsedData = backlogData ? JSON.parse(backlogData) : [];
        const taskIndex = parsedData.findIndex(
          (item: any) => item.id.toString() == taskId
        );
        if (taskIndex !== -1) {
          parsedData[taskIndex] = {
            ...parsedData[taskIndex],
            userStory,
            testCase,
            testData,
            code,
          };
          localStorage.setItem("backlogData", JSON.stringify(parsedData));
        }
      } else {
        const parsedData = JSON.parse(backlogData);
        parsedData.push(...data);
        localStorage.setItem("backlogData", JSON.stringify(parsedData));
      }
    } else {
      localStorage.setItem("backlogData", JSON.stringify(data));
    }
    triggerAlert("Ticket created Successfully & pushed to backlog!", "success");
    window.location.href = "#/backlog";
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const callGpt = async (query: string): Promise<string | null> => {
    setLoading(true);
    const response = await fetch(
      "http://127.0.0.1:5000/user-story-generation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: query,
        }),
      }
    )
      .then((response) => response.text())
      .then((data) => {
        setLoading(false);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        return error;
      });
    return response;
  };

  const onsubmitHandler = async (e: any) => {
    e.preventDefault();
    const query = e.target.query.value;
    if (query.length === 0) return;
    const userStorydata = await callGpt(`
        Write an elaborate agile user story for a JIRA Ticket in Gherkin format for ${query}
        `);
    setUserStory(userStorydata);
    userStorydata && localStorage.setItem("userStory", userStorydata);
  };

  const generateTestCases = async () => {
    if (!userStory) return;
    const testcaseData = await callGpt(
      userStory +
        " generate test cases for for a JIRA Ticket of the above user story"
    );
    setTestCase(testcaseData);
    testcaseData && localStorage.setItem("testcase", testcaseData);
  };

  const generateTestData = async () => {
    if (!testCase) return;
    const testcaseData = await callGpt(
      testCase +
        " Generate the 10 sample sets of test data for the above test case in list view for a JIRA Ticket"
    );
    setTestData(testcaseData);
    testcaseData && localStorage.setItem("testdata", testcaseData);
  };

  const generateCode = async () => {
    if (!testData) return;
    const testCode = await callGpt(
      `Generate sample codes example in ${age} for the  user story of :  ${userStory} \n that supports the bellow test cases\n ${testCase}`
    );
    setCode(testCode);
    testCode && localStorage.setItem("code", testCode);
  };

  React.useEffect(() => {
    const savedUserStory = localStorage.getItem("userStory");
    const savedTestcase = localStorage.getItem("testcase");
    const savedTestData = localStorage.getItem("testdata");
    const testCode = localStorage.getItem("code");
    if (savedUserStory) {
      setUserStory(savedUserStory);
    }
    if (savedTestcase) {
      setTestCase(savedTestcase);
    }
    if (savedTestData) {
      setTestData(savedTestData);
    }
    if (testCode) {
      setCode(testCode);
    }
  }, []);

  React.useEffect(() => {
    console.log("============>", taskId);
    if (taskId) {
      const backlogData = localStorage.getItem("backlogData");
      if (backlogData) {
        const parsedData = JSON.parse(backlogData);
        const task = parsedData.find(
          (item: any) => item.id.toString() == taskId
        );
        console.log("============>", taskId, parsedData, task);
        if (task) {
          localStorage.setItem("userStory", task.userStory);
          localStorage.setItem("testcase", task.testCase);
          localStorage.setItem("testdata", task.testData);
          localStorage.setItem("code", task.code);

          setUserStory(task.userStory);
          setTestCase(task.testCase);
          setTestData(task.testData);
          setCode(task.code);
        }
      }
    }
  }, []);

  console.log(userStory);
  return (
    <>
      <div className="chat-hldr">
        <div className="chat-scrollhldr">
          <WelcomeChatComp />

          <div className="chat-msg">
            {userStory && (
              <CreateUserStory
                userStory={userStory}
                setUserStory={setUserStory}
                testCase={testCase}
                generateTestCases={generateTestCases}
              />
            )}
            {testCase && (
              <CreateTestCases
                testCase={testCase}
                setTestCase={setTestCase}
                generateTestCases={generateTestCases}
                generateTestData={generateTestData}
              />
            )}
            {testData && (
              <>
                <CreateTestData
                  testData={testData}
                  setTestData={setTestData}
                  generateTestData={generateTestData}
                />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={"React JS"}>React JS</MenuItem>
                      <MenuItem value={"Python"}>Python</MenuItem>
                      <MenuItem value={"HTML"}>HTML</MenuItem>
                      <MenuItem value={"Kotlin"}>Kotlin</MenuItem>
                      <MenuItem value={"Apex"}>Apex (Salesforce)</MenuItem>
                    </Select>
                    <button
                      className="newConversationButton"
                      style={{ width: "130px" }}
                      onClick={() => generateCode()}
                    >
                      Generate code
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAqBJREFUWAm1WLuRAjEMpQRKuAYogIyIAiiAuRgSIghhhgIoAGaOkOwIyKEDLoQcYlk0sHdvx1qMd621ObgZj9a29PQsyR+u0Uj4I6ImEY2Y+csYc2RmYubMNsKYMeabiD6J6CMBOk6ViDrGmL3jVJyr0pLqxHlRtLCqZwj4hC2h5yJkU+CGXl2977yiT8BU1l2e+gOZVgD9l4jYT8seK0beTCKOjE2HKKvyfD5n4/H4oV2vV9XGjXIwTShMbzuqoIfDIWu1Wlm3283a7Xb+jTHXWc03aqZcwKjsGsMHJ0IE0v1OwbjdbvuH6sA5kQIAXde5+52KA98FGSLaagCn0ynz2263K9IhRDabTUkPdhp2ERVbG0FlAKEWQg0khEhIp44Mro4G7gWNsRDBDsGK/YZ57BZ/HH3YgFwEkRGI1KYFYADWCFfNwSaGCC7RBjPjFg06kYhMJpPKVVdFQsZgE0nkCCLqfSJEAPhsizjoCESC0ZA52SHL5TIvTClQTUIXxGNTGkVEQCNWVixKIglbWZAma1MD4/l8nh/jAoQIDYfDkoPBYJBhTvRw9MNW+orMU6MWK4z7/X7eBGixWOR3jPRF+qmAXa/XiyFyxPZdC1BI+iuLJeJHMoTPzFsQwWM4yBp1gZXCOfKOBge4daUvEnqr1aoYhw3GMK/5wKEKIk1Nqe74hqO6BgzNR/EcwMUTUkREUIBySD0jL5eLRmTr3r7Jz4AQ8dTxh2cAGGlRSQVP0L9HQ8JinwPqcZ/gQEuFzFU/FUGobge9mIj+G4eZZy92KBFw5Uwyoco3k4kjIQxtml5ZM8DS0yHOfWkLWH3BxaTRGHMoDi3fSUrf/txIJmQJ3H8upDjVdLEq+9jeGmN+vNcd/lGDsTXSmr/MNTBv7hffBPEsHKEseQAAAABJRU5ErkJggg=="
                        alt="Clear Chat"
                      />
                    </button>
                  </FormControl>
                </Box>
              </>
            )}
            {code && !loading && (
              <>
                <h2>Generated Code</h2>

                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  value={code}
                  onChange={(newValue) => {
                    setCode(newValue);
                    localStorage.setItem("code", newValue);
                  }}
                  setOptions={{
                    useWorker: false,
                  }}
                  editorProps={{ $blockScrolling: true }}
                  //   height="400px"
                  width="100%"
                  style={{ padding: 10, borderRadius: 15 }}
                />

                <br />

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="newConversationButton"
                    style={{ width: "130px" }}
                    onClick={() => saveDataToLocalStorage()}
                  >
                    {taskId ? "Update ticket" : "Create ticket"}
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAqBJREFUWAm1WLuRAjEMpQRKuAYogIyIAiiAuRgSIghhhgIoAGaOkOwIyKEDLoQcYlk0sHdvx1qMd621ObgZj9a29PQsyR+u0Uj4I6ImEY2Y+csYc2RmYubMNsKYMeabiD6J6CMBOk6ViDrGmL3jVJyr0pLqxHlRtLCqZwj4hC2h5yJkU+CGXl2977yiT8BU1l2e+gOZVgD9l4jYT8seK0beTCKOjE2HKKvyfD5n4/H4oV2vV9XGjXIwTShMbzuqoIfDIWu1Wlm3283a7Xb+jTHXWc03aqZcwKjsGsMHJ0IE0v1OwbjdbvuH6sA5kQIAXde5+52KA98FGSLaagCn0ynz2263K9IhRDabTUkPdhp2ERVbG0FlAKEWQg0khEhIp44Mro4G7gWNsRDBDsGK/YZ57BZ/HH3YgFwEkRGI1KYFYADWCFfNwSaGCC7RBjPjFg06kYhMJpPKVVdFQsZgE0nkCCLqfSJEAPhsizjoCESC0ZA52SHL5TIvTClQTUIXxGNTGkVEQCNWVixKIglbWZAma1MD4/l8nh/jAoQIDYfDkoPBYJBhTvRw9MNW+orMU6MWK4z7/X7eBGixWOR3jPRF+qmAXa/XiyFyxPZdC1BI+iuLJeJHMoTPzFsQwWM4yBp1gZXCOfKOBge4daUvEnqr1aoYhw3GMK/5wKEKIk1Nqe74hqO6BgzNR/EcwMUTUkREUIBySD0jL5eLRmTr3r7Jz4AQ8dTxh2cAGGlRSQVP0L9HQ8JinwPqcZ/gQEuFzFU/FUGobge9mIj+G4eZZy92KBFw5Uwyoco3k4kjIQxtml5ZM8DS0yHOfWkLWH3BxaTRGHMoDi3fSUrf/txIJmQJ3H8upDjVdLEq+9jeGmN+vNcd/lGDsTXSmr/MNTBv7hffBPEsHKEseQAAAABJRU5ErkJggg=="
                      alt="Clear Chat"
                    />
                  </button>
                </div>
              </>
            )}
            {loading && <Loader />}
          </div>
        </div>
        <br />
        <br />

        {!userStory && (
          <form
            onSubmit={(e) => onsubmitHandler(e)}
            style={{ gridColumn: "span 4", marginBottom: "20px" }}
          >
            <div className="Input-Container">
              <input
                className="Input-Field"
                type="text"
                placeholder="How can I help you today?"
                id="query"
                name="query"
              />
              <button className="Send-Button" type="submit">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAddJREFUaAXtmOFtwjAQRhmhI+RnFO47ZYSO0BEYgREYgQ3aTdoN2g3oBozQ9ipOOqwkOPjsGClIyHYI8Xtnn+Nks1k/awTWCFxFgIieAZwB/AB4bdu2uTqh9gaA0wVeBPT7OCIm+gpvy/pFiOhgIm/hbb1ekUsOWNipep0iAN4jRsGK1SWy3W73MwVUpg6Rvu+fbiSzAo+Vy4vcMY2GZJYTmZnMQ/D22DIiidPICmi9rEjkPUHh5pRlRJyn0ZBgfhGnZB6Ct8fyiSTcEyxgbN1f5HJPiAXwOs9XRHKBmfdEdATwwcz6vOAFPHYdXxH7LCMjU1Asn4iVknpOMcnHsL9ibSexczHgsKOmaf6nnERRcomIZMs+K5eY+RRe173tATq0lRd4yTk34FygIbyAA9glgYt5ytCHUDFtF3CxlvdCMR16neMGrkPWdd3OC27qOu7gKkBEn1Mdp/6WDTz39MkKrtEH8JYa4fD/RcCNwNB70rGN1+TxouAiAOAljN497eLgJvpJ00e23Mx8kD2QXrNYmbL2LwquEbpn7a8CXAXmrP1VgYtA7PSpDlyjf2vtrxZcBcamT/XgKhC+yHoYcBXouq7/u4l9MfP3Yuu4wqzlGoE1Ajcj8AvY+lHSUC3vMgAAAABJRU5ErkJggg=="
                  alt="Send"
                  className="Send-Icon"
                />
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Chat;
