import 'package:flutter/material.dart';

class TaskItem extends StatelessWidget {
  const TaskItem(
      {Key? key,
      required this.taskName,
      required this.taskCompleted,
      required this.onChanged,
      this.onDelete})
      : super(key: key);

  final String taskName;
  final bool taskCompleted;
  final Function(bool?)? onChanged;
  final Function(BuildContext)? onDelete;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 0),
      child: Container(
        decoration: BoxDecoration(
            color: Colors.deepPurple, borderRadius: BorderRadius.circular(15)),
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Checkbox(
              value: taskCompleted,
              onChanged: onChanged,
              checkColor: Colors.black,
              activeColor: Colors.white,
              side: const BorderSide(color: Colors.white),
            ),
            Text(
              taskName,
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
                decoration: taskCompleted
                    ? TextDecoration.lineThrough
                    : TextDecoration.none,
                decorationThickness: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
