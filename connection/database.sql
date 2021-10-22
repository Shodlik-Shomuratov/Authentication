create database students;

create table users(
`id` int primary key auto_increment,
`firstname` varchar(255),
`lastname` varchar(255),
`date` date,
`course` varchar(255),
`email` varchar(255),
`password` varchar(255),
`activate` varchar(255) default "false"
);