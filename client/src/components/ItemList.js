import React from "react";
import { array, bool, object } from "prop-types";
import { Link } from "react-router-dom";
import { Button, Icon, List } from "antd";
import { Aux } from "../utils/utils";

const IconText = ({ id, type, text }) => (
  <Link to={"/edit/" + id}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </Link>
);

export const ItemList = ({ loading, dataSource, pagination, loggedIn }) => {
  return (
    <div>
      <List
        loading={loading}
        itemLayout="vertical"
        size="large"
        bordered={true}
        pagination={pagination}
        dataSource={dataSource}
        renderItem={item => (
          <List.Item
            key={"card-" + item.id}
            actions={
              loggedIn
                ? [<IconText id={item.id} type="edit" text="Редактировать" />]
                : []
            }
          >
            <List.Item.Meta
              title={
                <Aux>
                  {item.audio ? (
                    <Aux>
                      <Button
                        style={{ marginRight: "5px" }}
                        size={"small"}
                        shape="circle"
                        icon="play-circle-o"
                        onClick={() => {
                          this["audio" + item.id].play();
                        }}
                      />
                      <audio
                        ref={audio => {
                          this["audio" + item.id] = audio;
                        }}
                      >
                        <source src={item.audio} type="audio/mp3" />
                      </audio>
                    </Aux>
                  ) : null}
                  {item.title}
                </Aux>
              }
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

ItemList.propTypes = {
  loading: bool.isRequired,
  dataSource: array.isRequired,
  pagination: object.isRequired,
  loggedIn: bool.isRequired
};
