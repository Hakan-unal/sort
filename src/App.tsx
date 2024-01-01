import { Row, Typography, Col, Image, Switch, Card } from "antd";
import { useState } from "react";
import { translator } from "./language/language";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

import food1 from "../src/assets/food1.webp";
import food2 from "../src/assets/food2.webp";
import food3 from "../src/assets/food3.webp";
import food4 from "../src/assets/food4.webp";

const staticArr = [{ title: "food1",description:"description1",image:food1},{ title: "food2",description:"description2",image:food3 },{ title: "food3",description:"description3" ,image:food2},{ title: "food4",description:"description4" ,image:food4}];

const { Title, Paragraph } = Typography;

const App = () => {
  const [translate, setTranslate] = useState<string>("uk");
  const [current, setCurrent] = useState<number>(0);

  const handleFood = (type: string) => {
    let tempCurrent=current;

    switch (type) {
      case "left":
        
        tempCurrent--;
        if(tempCurrent===-1)tempCurrent=3
        setCurrent(tempCurrent);
        break;
      case "right":
        tempCurrent++;
        if(tempCurrent===4)tempCurrent=0
        setCurrent(tempCurrent);
        break;
    }
  };

  return (
    <Row justify={"center"}>
      <Col span={16} md={8}>
        <Card
          cover={<Image src={staticArr[current].image} />}
          title={
            <Row justify="space-between">
              <Col span={4} md={2}>
                <IoIosArrowDropleft
                  onClick={() => handleFood("left")}
                  style={{ cursor: "pointer" }}
                  size={25}
                />
              </Col>
              <Col span={6} md={6}>
                <Switch
                  unCheckedChildren={<div>UK</div>}
                  checkedChildren={<div>EN</div>}
                  onChange={(checked) => setTranslate(checked ? "en" : "uk")}
                />
              </Col>
              <Col span={4} md={2}>
                <IoIosArrowDropright
                  onClick={() => handleFood("right")}
                  style={{ cursor: "pointer" }}
                  size={25}
                />
              </Col>
            </Row>
          }
        >
          <Title level={3}> {translator(staticArr[current].title, translate)}</Title>
          <Paragraph> {translator(staticArr[current].description, translate)}</Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default App;
