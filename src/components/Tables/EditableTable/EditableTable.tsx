import React, { useState, useEffect } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Form, Input, Select, Tag } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { defaultData } from "./data";
import type { DataSourceType } from "./data";

export const EditableTable: React.FC = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<DataSourceType[]>(defaultData);
  const [filteredData, setFilteredData] =
    useState<DataSourceType[]>(defaultData);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  const yearFields = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

  const handleFilter = (source: DataSourceType[]) => {
    const values = form.getFieldsValue();
    const filtered = source.filter((item) => {
      return (
        (!values.name ||
          item.name.toLowerCase().includes(values.name.toLowerCase())) &&
        (!values.stage || item.stage === values.stage) &&
        (!values.result || item.result === values.result)
      );
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    const updated = dataSource.map((item) => {
      const sum = yearFields.reduce(
        (acc, year) => acc + Number(item[year] || 0),
        0
      );
      return { ...item, total: sum };
    });
    setFilteredData(updated);
  }, [dataSource]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Результат",
      dataIndex: "result",
      valueType: "select",
      align: "center",
      width: 80,
      valueEnum: {
        success: {
          text: (
            <CheckCircleFilled style={{ color: "#52c41a", fontSize: 16 }} />
          ),
        },
        error: {
          text: (
            <CloseCircleFilled style={{ color: "#ff4d4f", fontSize: 16 }} />
          ),
        },
        default: {
          text: (
            <MinusCircleFilled style={{ color: "#d9d9d9", fontSize: 16 }} />
          ),
        },
      },
    },
    {
      title: "Этап",
      dataIndex: "stage",
      align: "center",
      valueType: "select",
      width: 100,
      valueEnum: {
        "1П": { text: "1П", status: "Success" },
        "2П": { text: "2П", status: "Error" },
        "3П": { text: "3П", status: "Default" },
      },
      render: (_, record) => {
        const color =
          record.stage === "1П"
            ? "green"
            : record.stage === "2П"
            ? "red"
            : "gray";
        return <Tag color={color}>{record.stage}</Tag>;
      },
    },
    { title: "Наименование", dataIndex: "name", width: 150 },
    {
      title: "Ред.",
      align: "center",
      valueType: "option",
      width: 40,
      render: (_, record, __, action) => [
        <div key="edit" style={{ display: "flex", justifyContent: "center" }}>
          <a onClick={() => action?.startEditable?.(record.id)}>✎</a>
        </div>,
      ],
    },
    ...[
      {
        title: "начало поиска",
        dataIndex: "startSearch",
        bg: "#fdd",
      },
      {
        title: "начало разведки",
        dataIndex: "startExploration",
        bg: "#fef4e8",
      },
      {
        title: "начало инвестиций",
        dataIndex: "startInvestment",
        bg: "#e6ffe6",
      },
      {
        title: "начало добычи",
        dataIndex: "startProduction",
        bg: "#d9f1ff",
      },
    ].map(
      ({ title, dataIndex, bg }) =>
        ({
          title,
          dataIndex,
          align: "center",
          width: 80,
          editable: false,
          render: (text: number) => (
            <div
              style={{
                backgroundColor: bg,
                padding: "4px",
                textAlign: "right",
              }}
            >
              {text}
            </div>
          ),
        } as ProColumns<DataSourceType>)
    ),
    {
      title: "ИТОГО",
      align: "center",
      dataIndex: "total",
      width: 60,
      editable: false,
    },
    ...yearFields.map(
      (year) =>
        ({
          title: year,
          dataIndex: year,
          align: "center",
          width: 60,
        } as ProColumns<DataSourceType>)
    ),
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto", padding: 16 }}>
      <Form
        form={form}
        layout="inline"
        onValuesChange={() => handleFilter(dataSource)}
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="name" label="Наименование">
          <Input placeholder="Поиск по имени" allowClear />
        </Form.Item>
        <Form.Item name="stage" label="Этап">
          <Select placeholder="Выбрать этап" allowClear style={{ width: 120 }}>
            <Select.Option value="">Все этапы</Select.Option>
            <Select.Option value="1П">1П</Select.Option>
            <Select.Option value="2П">2П</Select.Option>
            <Select.Option value="3П">3П</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="result" label="Результат">
          <Select
            placeholder="Выбрать результат"
            allowClear
            style={{ width: 150 }}
          >
            <Select.Option value="">Все результаты</Select.Option>
            <Select.Option value="success">Успех</Select.Option>
            <Select.Option value="error">Ошибка</Select.Option>
            <Select.Option value="default">Нет данных</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ minWidth: 900, width: "100%" }}>
          <EditableProTable<DataSourceType>
            rowKey="id"
            scroll={{ x: "max-content" }}
            recordCreatorProps={false}
            columns={columns}
            value={filteredData}
            onChange={setDataSource}
            editable={{
              type: "multiple",
              editableKeys,
              onChange: setEditableKeys,
              saveText: "Сохранить",
              deleteText: " ",
              cancelText: "Отмена",
            }}
            components={{
              header: {
                row: (props) => (
                  <tr {...props} style={{ backgroundColor: "#0070C0" }} />
                ),
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#0070C0",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  />
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
