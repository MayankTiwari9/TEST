import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../Store/expenses";
import {
  Row,
  Button,
  FloatingLabel,
  Col,
  Form,
  Spinner,
  Card,
} from "react-bootstrap";

const Expense = () => {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState({});
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [isPremiumActivated, setIsPremiumActivated] = useState(false);
  const dispatch = useDispatch();

  const addExpenseHandler = (e) => {
    e.preventDefault();
    const newExpense = {
      amount: amount,
      description: description,
      category: category,
    };

    if (editExpenseId !== null) {
      axios
        .put(
          `https://expense--tracker-5c182-default-rtdb.firebaseio.com/expense/${editExpenseId}.json`,
          newExpense
        )
        .then((res) => {
          setExpenses((prevExpenses) => {
            const updatedExpenses = {
              ...prevExpenses,
              [editExpenseId]: newExpense,
            };
            alert.success("Expense Updated");
            return updatedExpenses;
          });
        })
        .catch((err) => console.log(err));
      setEditExpenseId(null);
    } else {
      axios
        .post(
          "https://expense--tracker-5c182-default-rtdb.firebaseio.com/expense.json",
          newExpense
        )
        .then((res) => {
          const addedExpense = {
            id: res.data.name,
            ...newExpense,
          };
          setExpenses((prevExpenses) => ({
            ...prevExpenses,
            [res.data.name]: addedExpense,
          }));
          alert.success("Expense Added");
          dispatch(expenseActions.addExpense({ data: addedExpense }));
        })
        .catch((err) => console.log(err));
      getAllExpense();
    }
    setAmount("");
    setDescription("");
    setCategory("");
  };

  const getAllExpense = useCallback(() => {
    axios
      .get(
        "https://expense--tracker-5c182-default-rtdb.firebaseio.com/expense.json"
      )
      .then((res) => {
        if (res.data) {
          let expenseArray = res.data;
          dispatch(expenseActions.setExpense({ data: expenseArray }));
          setExpenses(expenseArray);
          const expenseAmount = Object.values(expenseArray);
          const totalExpenses = expenseAmount.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
          );
          setIsPremiumActivated(totalExpenses > 10000);
        }
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const deleteExpense = (id) => {
    axios
      .delete(
        `https://expense--tracker-5c182-default-rtdb.firebaseio.com/expense/${id}.json`
      )
      .then((res) => {
        setExpenses((prevExpenses) => {
          const updatedExpenses = { ...prevExpenses };
          delete updatedExpenses[id];
          return updatedExpenses;
        });
        alert.success("Expense Deleted");
      })
      .catch((err) => console.log(err));
  };

  const handleEditClick = (id) => {
    setEditExpenseId(id);

    const expenseToEdit = expenses[id];
    setAmount(expenseToEdit.amount);
    setDescription(expenseToEdit.description);
    setCategory(expenseToEdit.category);
  };

  useEffect(() => {
    getAllExpense();
  }, [getAllExpense]);

  return (
    <div>
      <div className="container text-center mt-5">
        <h3 className="text-content-center">Track Your Expenses Daily</h3>
      </div>
      <Row className="g-2 mt-3 p-4" onSubmit={addExpenseHandler}>
        <Col md>
          <FloatingLabel controlId="floatingInputid" label="Money spent">
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <loatingLabel controlId="floatingInpuGrid" label="Description">
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </loatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingSelectGrid" label="Category">
            <Form.Select
              aria-label="Floating label select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Emi">Emi</option>
              <option value="House Rent">House Rent</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Button
        type="submit"
        style={{ width: "100px", display: "block", margin: "auto" }}
      >
        Add Expense
      </Button>
      <div className="container text-center mt-5">
        <ul style={{ width: "70%", marginLeft: "11rem" }}>
          {Object.entries(expenses).map(([id, expense]) => (
            <Card
              key={id}
              className="text-center"
              style={{ marginTop: "20px", marginBottom: "50px" }}
            >
              <Card.Header>Rs.{expense.amount}</Card.Header>
              <Card.Body>
                <Card.Title>{expense.category}</Card.Title>
                <Card.Text>{expense.description}</Card.Text>
                {editExpenseId !== id && (
                  <Button
                  variant='outline-warning' style={{width: "20%", margin: "10px"}}
                    onClick={() => handleEditClick(id)}
                  >
                    Edit Expense
                  </Button>
                )}
                <Button
                  variant='outline-danger' style={{width: "20%"}}
                  onClick={() => deleteExpense(id)}
                >
                  Delete Expense
                </Button>
              </Card.Body>
              <Card.Footer className="text-mutes">This Year</Card.Footer>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expense;
