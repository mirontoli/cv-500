import React from "react";
import { array, bool, object } from 'prop-types';
import { Button, List } from "antd";
import { Aux } from "../utils/utils";

export const ItemList = ({ loading, dataSource, pagination }) => {
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
          <List.Item key={"card-" + item.id}>
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
  pagination: object.isRequired
};
