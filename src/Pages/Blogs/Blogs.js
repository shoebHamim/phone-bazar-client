import React from 'react';

const Blogs = () => {
  return (
    <div className='min-h-screen'>
      <h1 className='text-xl font-semibold text-center my-4'>Blogs</h1>
      <p className='font-semibold'>1. What are the different ways to manage a state in a React application?</p>
      <p>- There are many ways to manage states in a react application. One can use
        React Hooks, React Context API, state management libraries like Redux or Recoil or any other state management tool/library to manage states. Using Hooks
        is the most basic way to manage states in a react app. We can use hooks like useState,useEffect,useReducer to get the 
        job done without using external state management library.Then comes react context api. This state management technique is used when a state is likely to be used randomly or 
        in a lot of component throughout the entire application. Finally, there are state management libraries - redux,recoil,jotai,rematch etc.
        Among them Redux is on of the most popular React state management libraries. It allow's to manage app's state 
        in a single place.
      </p>
      <br />
      <p className='font-semibold'>2. How does prototypical inheritance work?</p>
      <p>-Prototypical inheritance is a feature in javascript that allows object to inherit the properties and methods
        of another object. In JavaScript, for example, each object has a prototype property that refers to another object, and the properties and methods of that object are available to the first object. If a property or method is not found on the first object, the program will look for it on the prototype object, and so on, up the prototype chain.
        This goes on until the chain reaches a prototype that has null for it's own prototype.This is how prototypical inheritance work.    </p>
        <br />
      <p className='font-semibold'>3. What is a unit test? Why should we write unit tests?</p>
      <p>- Unit test is a type of testing where each unit(like smaller functions) of a code that is doing a big task is tested.
        For example we can write calculator app that can do basic mathematical operations -addition, subtraction, division, multiplication. As unit test we can 
        test if each operation works as they should. Unit test helps developers to break down a bigger problem into smaller chunks and manage and test those individually.
        It makes it easy to manage,debug and also be focused while dealing with complex big project.
      </p>
      <br />
      <p className='font-semibold'>4. React vs. Angular vs. Vue?</p>
      <p>- React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.
        They all are somewhat similar but not same. These 3 are most popular front-end library/framework.
        React apps are component based and written in Javascript using JSX. While 
        Angular applications are modular and have their own modularity system called NgModules.
        On the other hand vue also relies on reusable components like react.
         
      </p>
    </div>
  )
};

export default Blogs;