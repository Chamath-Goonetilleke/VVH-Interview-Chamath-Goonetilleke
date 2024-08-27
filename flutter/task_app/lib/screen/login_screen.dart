import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:task_app/screen/TaskScreen.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  

  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  Future loginUser() async {
    try {
      
      var response = await http.post(Uri.parse('http://localhost:8081/auth/login'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',

        },
        body: jsonEncode(<String, String>{
          'email': emailController.text,
          'password':passwordController.text
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

  void handleLogin(context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const TaskScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Container(
            child: Column(
          children: [
            TextField(
              decoration: const InputDecoration(hintText: "Email"),
              controller: emailController,

            ),
            TextField(
              decoration: const InputDecoration(hintText: "Password"),
              controller: passwordController,
            ),
            OutlinedButton(
                onPressed: () {
                  loginUser();
                },
                child: const Text("Login"))
          ],
        )),
      ),
    );
  }
}
