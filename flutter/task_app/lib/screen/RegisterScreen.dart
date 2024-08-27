import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:task_app/screen/login_screen.dart';
import 'package:http/http.dart' as http;

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final nameController = TextEditingController();

  final emailController = TextEditingController();

  final passwordController = TextEditingController();

  Future handleRegister()async{
     try {
      
      var response = await http.post(Uri.parse('http://localhost:8081/auth/register'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',

        },
        body: jsonEncode(<String, String>{
          'name': nameController.text,
          'email': emailController.text,
          'password':passwordController.text
        }),
      );
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const LoginScreen()),
      );
      AlertDialog();
    } catch (error) {
      throw error;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Registration"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            TextField(
              decoration: const InputDecoration(hintText: "Name"),
              controller: nameController,
            ),
            TextField(
              decoration: const InputDecoration(hintText: "Email"),
              controller: emailController,
            ),
            TextField(
              decoration: const InputDecoration(hintText: "Password"),
              controller: passwordController,
            ),
            Row(
              children: [
                OutlinedButton(onPressed: handleRegister, child: const Text("Register")),
                TextButton(
                  child: const Text('login'),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const LoginScreen()),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
