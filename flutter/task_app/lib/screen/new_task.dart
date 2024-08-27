import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:task_app/screen/TaskScreen.dart';

class NewTask extends StatefulWidget {
const NewTask({ Key? key }) : super(key: key);

  @override
  State<NewTask> createState() => _NewTaskState();
}

class _NewTaskState extends State<NewTask> {
final titleController = TextEditingController();

  final descriptionController = TextEditingController();

  Future createNewTask() async {
    try {
      var response = await http.post(
        Uri.parse('http://localhost:8081/api/task'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q2YjE4ODAyNjc4YzM3MjM4MDBjNiIsImlhdCI6MTcyNDc1ODEyMn0.RndDL-c5N_EuUa9YyAOnahrbP6Pf2mvXkWi9WIMGsL0"
        },
        body: jsonEncode(<String, String>{
          'title': titleController.text,
          'description': descriptionController.text
        }),
      );
       Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const TaskScreen()),
      );
      AlertDialog();
    } catch (error) {
      throw error;
    }
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: const Text("Create New Task"),),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(children: [
          TextField(
            decoration: const InputDecoration(hintText: "Title"),
            controller: titleController,
          ),
          TextField(
            decoration: const InputDecoration(hintText: "Description"),
            controller: descriptionController,
          ),
          ElevatedButton(onPressed: (){
            createNewTask();
          }, child: const Text("Add New Task"))
        ]),
      ),
    );
  }
}