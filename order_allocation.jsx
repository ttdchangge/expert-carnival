import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";

const OrderAllocation = () => {
  const [orders, setOrders] = useState([]);
  const [accountLimit, setAccountLimit] = useState(5);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split("\n").map(line => line.split(","));
      const formattedOrders = lines.map(line => ({ id: line[0], product: line[1], quantity: line[2], address: line[3] }));
      setOrders(formattedOrders);
    };
    reader.readAsText(file);
  };

  const allocateOrders = () => {
    const accounts = Array.from({ length: accountLimit }, () => []);
    orders.forEach((order, index) => {
      accounts[index % accountLimit].push(order);
    });
    console.log("分配结果:", accounts);
  };

  return (
    <div className="p-6">
      <Card className="p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">智能订单分配</h2>
          <Input type="file" onChange={handleUpload} className="mb-4" />
          <Input
            type="number"
            value={accountLimit}
            onChange={(e) => setAccountLimit(Number(e.target.value))}
            className="mb-4"
            placeholder="Temu 账号数量"
          />
          <Button onClick={allocateOrders}>开始分配</Button>
        </CardContent>
      </Card>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableCell>订单号</TableCell>
            <TableCell>商品</TableCell>
            <TableCell>数量</TableCell>
            <TableCell>地址</TableCell>
          </TableRow>
        </TableHeader>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.product}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{order.address}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default OrderAllocation;
