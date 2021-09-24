use place_application_dbs

create table image
(
	img_no int auto_increment primary key,
	path varchar(30) not null,
	type varchar(8) not null
)


ALTER table image modify COLUMN type varchar(30) not null;

alter table image ADD COLUMN width int

alter table place_msg drop COLUMN image


alter table place_msg add COLUMN img_no int

alter table place_msg add constraint FK_IMG_ID foreign key(img_no) REFERENCES image(img_no)


INSERT into image(path, type) values("/images/student/swiper/bg1007.jpg","stu_swiper");
INSERT into image(path, type) values("/images/student/swiper/bg1008.jpg","stu_swiper");
INSERT into image(path, type) values("/images/student/swiper/bg1010.jpg","stu_swiper");
INSERT into image(path, type) values("/images/student/swiper/bg1012.jpg","stu_swiper");

INSERT into image(path, type) values("/images/student/swiper/bg1015.jpg","stu_swiper");


INSERT into image(path, type, width,height) VALUES("/images/upload/places/place (2).jpg",'place',800 , 450)
 