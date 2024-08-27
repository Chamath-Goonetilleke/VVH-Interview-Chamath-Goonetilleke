import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:task_app/screen/list_item.dart';
import 'package:task_app/screen/new_task.dart';
import 'package:task_app/services/TaskServices.dart';

class TaskScreen extends StatefulWidget {
  const TaskScreen({Key? key}) : super(key: key);

  @override
  State<TaskScreen> createState() => _TaskScreenState();
}

class _TaskScreenState extends State<TaskScreen> {
  bool loading = false;

  List allTask = [
    ["Task1", false],
    ["Task2", false]
  ];

  Future getAllTasks() async {
    setState(() {
      loading = true;
    });
    try {
      var response =
          await http.get(Uri.parse('http://localhost:8081/api/task'));

      setState(() {
        loading = false;
      });
      //allTask = json.decode(response.body);

      return allTask;
    } catch (error) {
      setState(() {
        loading = false;
      });
      throw error;
    }
  }

  handleComplete(int index) {}

  Future createNewTask (context)async{
    
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Task Management"),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: (){
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const NewTask()),
            );
          },
          child: const Icon(Icons.add),
        ),
        body: ListView.builder(
            itemCount: allTask.length,
            itemBuilder: (BuildContext context, int index) {
              return Padding(
                padding:
                    EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 0),
                child: Container(
                  decoration: BoxDecoration(
                      color: Colors.deepPurple,
                      borderRadius: BorderRadius.circular(15)),
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    children: [
                      Checkbox(
                        value: allTask[index][1],
                        onChanged: handleComplete(index),
                        checkColor: Colors.black,
                        activeColor: Colors.white,
                        side: const BorderSide(color: Colors.white),
                      ),
                      Text(
                        allTask[index][0],
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          decoration: allTask[index][1]
                              ? TextDecoration.lineThrough
                              : TextDecoration.none,
                          decorationThickness: 2,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }));
  }
}
