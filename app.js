const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
const Technology = require("./models/Technology");
const technologyRoutes = require("./routes/technology");
const authRoutes = require("./routes/auth");

app.use(authRoutes);
app.use(technologyRoutes);
// const newSubtopic = {
//   name: "useMemo Hook",
//   videos: [
//     {
//       url: "https://www.youtube.com/watch?v=0eJz2Gnf-ss",
//       userId: mongoose.Types.ObjectId("614ebccbe51d6848d365b302"),
//     },
//   ],
//   questions: [
//     {
//       question: "What is the useMemo hook?",
//       answers: [
//         {
//           answer:
//             "The useMemo hook is a performance optimization in React that allows you to memoize a function's return value based on its dependencies, so that it only recomputes when those dependencies change.",
//           userId: mongoose.Types.ObjectId("614ebccbe51d6848d365b302"),
//         },
//       ],
//       userId: mongoose.Types.ObjectId("614ebccbe51d6848d365b302"),
//     },
//     {
//       question: "When should you use the useMemo hook?",
//       answers: [
//         {
//           answer:
//             "You should use the useMemo hook when you have a function that is computationally expensive and is called frequently, but its output only changes when certain inputs change. By memoizing the function's output, you can avoid unnecessary recalculations and improve performance.",
//           userId: mongoose.Types.ObjectId("614ebccbe51d6848d365b302"),
//         },
//       ],
//       userId: mongoose.Types.ObjectId("614ebccbe51d6848d365b302"),
//     },
//   ],
// };

// const technologyId = mongoose.Types.ObjectId("6443d0eaaaf53475cfc07074");

// Technology.findByIdAndUpdate(
//   technologyId,
//   { $push: { subtopics: newSubtopic } },
//   { new: true },
//   (err, updatedTechnology) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(updatedTechnology);
//     }
//   }
// );
// const newTechnology = new Technology({
//   name: "React",
//   subtopics: [
//     {
//       name: "React Basics",
//       description:
//         "Learn the fundamentals of React, a JavaScript library for building user interfaces",
//       codeSample:
//         "import React from 'react';\nimport ReactDOM from 'react-dom';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, world!</h1>\n      <p>Welcome to React</p>\n    </div>\n  );\n}\n\nReactDOM.render(\n  <App />, document.getElementById('root')\n);",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=DLX62G4lc44",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is React?",
//           answers: [
//             {
//               answer:
//                 "React is an open-source JavaScript library for building user interfaces.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 4,
//           downvotes: 0,
//         },
//         {
//           question: "What are React components?",
//           answers: [
//             {
//               answer:
//                 "React components are modular and reusable pieces of code that define a specific part of a user interface.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 3,
//           downvotes: 0,
//         },
//         {
//           question: "What is JSX in React?",
//           answers: [
//             {
//               answer:
//                 "JSX is a syntax extension that allows you to write HTML-like code in JavaScript.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 5,
//           downvotes: 1,
//         },
//       ],
//     },
//     {
//       name: "Components",
//       description:
//         "React components are the building blocks of React applications. They are modular and reusable pieces of code that define a specific part of a user interface.",
//       codeSample:
//         "function Button(props) { return <button>{props.label}</button> }",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=JPT3bFIwJYA",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "How do you create a React component?",
//           answers: [
//             {
//               answer:
//                 "You can create a React component by extending the 'React.Component' class and defining a 'render' method that returns the component's UI.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 10,
//           downvotes: 2,
//         },
//       ],
//     },
//     {
//       name: "State",
//       description:
//         "State in React refers to an object that represents the internal state of a component. It can be modified over time, typically in response to user interactions, network requests, or other asynchronous events. ",
//       codeSample:
//         "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  function increment() {\n    setCount(count + 1);\n  }\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={increment}>Click me</button>\n    </div>\n  );\n}",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=sBws8MSXN7A",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is state in React?",
//           answers: [
//             {
//               answer:
//                 "State is an object that stores data that is used by a component. It can be changed over time, and when it is, the component will re-render to show the new data.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 8,
//           downvotes: 1,
//         },
//         {
//           question: "What is the difference between props and state in React?",
//           answers: [
//             {
//               answer:
//                 "Props are used to pass data from a parent component to a child component, while state is used to store data that is used by a component itself.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 6,
//           downvotes: 0,
//         },
//       ],
//     },
//     {
//       name: "useEffect Hook",
//       description:
//         "The useEffect hook in React is a built-in hook that allows you to perform side effects in functional components. Side effects may include updating the DOM, fetching data, and subscribing to external events. ",
//       codeSample:
//         "import React, { useState, useEffect } from 'react';\n\nfunction MyComponent(props) {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=0gXH3zyF5ZA",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is the useEffect hook in React?",
//           answers: [
//             {
//               answer:
//                 "The useEffect hook is a built-in React hook that allows you to perform side effects in functional components, such as fetching data or manipulating the DOM.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 7,
//           downvotes: 1,
//         },
//       ],
//     },
//     {
//       name: "React Routing",
//       description:
//         "React Routing is a powerful tool for building Single Page Applications (SPAs) with React. With React Routing, you can easily define and manage different routes and their associated components, allowing you to create a more dynamic user experience. ",
//       codeSample:
//         "import React from 'react';\nimport { BrowserRouter, Route, Switch, Link } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <ul>\n          <li>\n            <Link to='/'>Home</Link>\n          </li>\n          <li>\n            <Link to='/about'>About</Link>\n          </li>\n          <li>\n            <Link to='/contact'>Contact</Link>\n          </li>\n        </ul>\n      </nav>\n      <Switch>\n        <Route exact path='/' component={Home} />\n        <Route path='/about' component={About} />\n        <Route path='/contact' component={Contact} />\n      </Switch>\n    </BrowserRouter>\n  );\n}\n\nfunction Home() {\n  return <h1>Home</h1>;\n}\n\nfunction About() {\n  return <h1>About</h1>;\n}\n\nfunction Contact() {\n  return <h1>Contact</h1>;\n};",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=Law7wfdg_ls",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is React Router?",
//           answers: [
//             {
//               answer:
//                 "React Router is a popular library used for routing in React applications. It allows you to handle client-side routing and build single-page applications with multiple views.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 4,
//           downvotes: 0,
//         },
//         {
//           question: "What are some of the components provided by React Router?",
//           answers: [
//             {
//               answer:
//                 "React Router provides several components, such as BrowserRouter, Route, Switch, and Link, that you can use to implement routing in your application.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 3,
//           downvotes: 0,
//         },
//       ],
//     },
//     {
//       name: "useReducer Hook",
//       description:
//         "The useReducer hook in React is a powerful tool that allows you to manage state in functional components using a reducer function. Instead of using the useState hook, useReducer lets you define a more complex state object and dispatch actions to modify it.",
//       codeSample:
//         "import React, { useReducer } from 'react';\n\nconst initialState = { count: 0 };\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    default:\n      throw new Error();\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n\n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n    </div>\n  );\n}",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=5J6fs_BlVC0",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is the useReducer hook in React?",
//           answers: [
//             {
//               answer:
//                 "The useReducer hook is a built-in React hook that allows you to manage state using a reducer function, similar to how state is managed in Redux. It's useful for managing complex state that involves multiple sub-values or when the next state depends on the previous state.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 8,
//           downvotes: 0,
//         },
//         {
//           question: "How does the useReducer hook work?",
//           answers: [
//             {
//               answer:
//                 "The useReducer hook takes a reducer function and an initial state as arguments, and returns an array with two elements: the current state and a dispatch function. The dispatch function is used to update the state, by calling the reducer function with the current state and an action object, which describes how the state should be updated.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 6,
//           downvotes: 0,
//         },
//       ],
//     },
//     {
//       name: "useMemo Hook",
//       description:
//         "With useMemo, you can cache the result of a function call and only recompute it if one of its dependencies changes.",
//       codeSample:
//         "import React, { useMemo, useState } from 'react';\n\nfunction MyComponent(props) {\n  const [value1, setValue1] = useState(0);\n  const [value2, setValue2] = useState(0);\n\n  const expensiveValue = useMemo(() => {\n    console.log('Calculating expensiveValue...');\n    return value1 * 100;\n  }, [value1]);\n\n  return (\n    <div>\n      <p>Expensive value: {expensiveValue}</p>\n      <button onClick={() => setValue1(value1 + 1)}>Increment value1</button>\n      <button onClick={() => setValue2(value2 + 1)}>Increment value2</button>\n    </div>\n  );\n}",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=9KJxaFHotqI",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is the useMemo hook in React?",
//           answers: [
//             {
//               answer:
//                 "The useMemo hook is a built-in React hook that allows you to memoize a value so that it is only re-computed when one of its dependencies has changed. It's useful for optimizing expensive computations or for preventing unnecessary re-renders.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 5,
//           downvotes: 0,
//         },
//         {
//           question: "How does the useMemo hook work?",
//           answers: [
//             {
//               answer:
//                 "The useMemo hook takes a function and an array of dependencies as arguments, and returns the memoized value of the function. The function is only re-computed when one of its dependencies has changed, otherwise the cached value is returned. This can help to optimize expensive computations or prevent unnecessary re-renders.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 4,
//           downvotes: 0,
//         },
//       ],
//     },
//     {
//       name: "Lazy Loading",
//       description:
//         "Learn how to use lazy loading in React to optimize performance by loading components only when needed.",
//       codeSample:
//         "import React, { lazy, Suspense } from 'react';\n\nconst MyComponent = lazy(() => import('./MyComponent'));\n\nfunction App() {\n  return (\n    <div>\n      <Suspense fallback={<div>Loading...</div>}>\n        <MyComponent />\n      </Suspense>\n    </div>\n  );\n}",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is lazy loading in React?",
//           answers: [
//             {
//               answer:
//                 "Lazy loading is a technique used to improve the performance of a React application by loading components only when needed, instead of loading everything up front.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 6,
//           downvotes: 0,
//         },
//         {
//           question: "How do you implement lazy loading in React?",
//           answers: [
//             {
//               answer:
//                 "You can use the lazy() function in React to create a component that is loaded lazily, and then wrap it with the Suspense component to provide a fallback while the component is being loaded.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 8,
//           downvotes: 0,
//         },
//       ],
//     },
//     {
//       name: "Redux",
//       description:
//         "Learn how to use Redux in React to manage the state of your application.",
//       codeSample:
//         "import { createStore } from 'redux';\n\nconst initialState = {\n  count: 0\n};\n\nfunction reducer(state = initialState, action) {\n  switch (action.type) {\n    case 'INCREMENT':\n      return {\n        count: state.count + 1\n      };\n    case 'DECREMENT':\n      return {\n        count: state.count - 1\n      };\n    default:\n      return state;\n  }\n}\n\nconst store = createStore(reducer);\n\nstore.subscribe(() => console.log(store.getState()));\n\nstore.dispatch({ type: 'INCREMENT' });\nstore.dispatch({ type: 'INCREMENT' });\nstore.dispatch({ type: 'DECREMENT' });",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=93p3LxR9xfM",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is Redux?",
//           answers: [
//             {
//               answer:
//                 "Redux is a predictable state container for JavaScript apps, that helps you manage the state of your application in a predictable way.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 8,
//           downvotes: 0,
//         },
//         {
//           question: "What are the core concepts of Redux?",
//           answers: [
//             {
//               answer:
//                 "The core concepts of Redux are actions, reducers, and the store. Actions are payloads of information that send data from your application to your store. Reducers specify how the application's state changes in response to actions, and the store is the object that brings them together.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 10,
//           downvotes: 0,
//         },
//       ],
//     },
//     {
//       name: "Context API",
//       description:
//         "Learn how to use Context API in React to share data between components without passing props through every level of the component tree.",
//       codeSample:
//         "import React, { createContext, useState } from 'react';\nimport ChildComponent from './ChildComponent';\n\nexport const MyContext = createContext();\n\nfunction ParentComponent() {\n  const [name, setName] = useState('John');\n\n  return (\n    <MyContext.Provider value={{ name, setName }}>\n      <ChildComponent />\n    </MyContext.Provider>\n  );\n}\n\nexport default ParentComponent;\n",
//       videos: [
//         {
//           url: "https://www.youtube.com/watch?v=lhMKvyLRWo0",
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//         },
//       ],
//       questions: [
//         {
//           question: "What is Context API?",
//           answers: [
//             {
//               answer:
//                 "Context API is a feature in React that allows you to share data between components without passing props through every level of the component tree.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 6,
//           downvotes: 0,
//         },
//         {
//           question: "When should you use Context API?",
//           answers: [
//             {
//               answer:
//                 "You should use Context API when you have data that needs to be accessed by many components at different levels of your component tree.",
//               userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//             },
//           ],
//           userId: mongoose.Types.ObjectId("615d7d0dc65338319e71a23f"),
//           upvotes: 7,
//           downvotes: 0,
//         },
//       ],
//     },
//   ],
// });
// newTechnology.save().then((data) => {
//   console.log("save successfull");
// });
// const Technology = require("./models/Technology");

// Technology.updateMany(
//   {},
//   {
//     $set: {
//       "subtopics.$[].questions.$[].upvotes": 0,
//       "subtopics.$[].questions.$[].downvotes": 0,
//       "subtopics.$[].questions.$[].answers.$[].upvotes": 0,
//       "subtopics.$[].questions.$[].answers.$[].downvotes": 0,
//     },
//   }
// )
//   .then((result) => {
//     console.log("Documents updated successfully");
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("Error updating documents: ", error);
//   });

// Technology.updateMany(
//   {},
//   {
//     $set: {
//       "subtopics.$[].questions.$[].answers.$[].upvoters": [],
//       "subtopics.$[].questions.$[].answers.$[].downvoters": [],
//     },
//   }
// ).then((res)=>{
//   console.log(res);
// })



const port = process.env.PORT || 8080;
const uri =
  "mongodb+srv://" +
  process.env.MONGO_USERNAME +
  ":" +
  process.env.MONGO_PASSWORD +
  "@cluster0.oantu.mongodb.net/Project?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then((result) => {
    app.listen(port);
    console.log("Server started");
  })
  .catch((err) => {
    console.log("Some error ocurred");
    console.log(err);
  });
