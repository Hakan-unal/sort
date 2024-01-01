import { Row, Col, Button, Space, Input, Divider ,message} from "antd";
import { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { showNotification } from "./components/general/notification";
import "./index.css";

const App = () => {
  const [numberArr, setNumberArr] = useState([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [value, setValue] = useState<number | undefined>(undefined);
  const [isRun, setIsRun] = useState<boolean>(false);


  const [messageApi, contextHolder] = message.useMessage();

  const handleInput = (event: any) => {
    const val = Number(event.target.value);
    setValue(val);
  };

  const info = () => {
    messageApi.loading({
      content: 'Sorting...',
      duration: 2,
    }).then(()=>{
      setIsRun(false);
    });
  };

  const handleClick = () => {
    const tempArr: any = [...numberArr];
    tempArr.push(value);

    setNumberArr(tempArr);

    if (tempArr.length === 6) setIsShow(true);

    setValue(undefined);
  };

  const handleBack = () => {
    setIsShow(false);
    setNumberArr([]);
  };

  const handleRun = () => {
    const tempArr: any = [...numberArr];
    setIsRun(true);

    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i - 1] > tempArr[i]) {
        setTimeout(() => {
          const swapNum = tempArr[i - 1];
          tempArr[i - 1] = tempArr[i];
          tempArr[i] = swapNum;

          setNumberArr(tempArr);
          showNotification("success","Sorted",`${tempArr[i - 1]} <-> ${tempArr[i]}`,null)
        }, 2000);
        break;
      }
    }

    info()
  };

  const NumberComponent = () => {
    return numberArr.map((obj, index) => {
      return (
        <Col key={index} span={4} sm={3} md={2}>
          <div className="box">{obj}</div>
        </Col>
      );
    });
  };

  const NumberScreen = () => (
    <>
      <Col span={4}>
        <Input value={value} onChange={handleInput} type="number" />
      </Col>
      <Col span={4} offset={1}>
        <Space>
          {isShow ? (
            <Button>Start</Button>
          ) : (
            <Button onClick={handleClick}>Submit</Button>
          )}
        </Space>
      </Col>
    </>
  );

  return (
    <Row justify={"center"}>
            {contextHolder}

      {isShow ? (
        <>
          <Space>
            <FaRegArrowAltCircleLeft
              onClick={handleBack}
              className="cursorPointer"
              size={25}
            />
            {isRun ? (
              <FaRegCirclePause
                onClick={handleRun}
                className="cursorPointer"
                size={25}
              />
            ) : (
              <FaRegCirclePlay
                onClick={handleRun}
                className="cursorPointer"
                size={25}
              />
            )}
          </Space>
          <Divider />
          {NumberComponent()}
        </>
      ) : (
        NumberScreen()
      )}
    </Row>
  );
};

export default App;
