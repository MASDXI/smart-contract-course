// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.8.0;

// จงเขียนโปรแกรม Smart Contract สำหรับการสั่งจองรถยนต์โดยกำหนดให้ข้อมูล รถยนต์ จำเป็นจะต้องเก็บข้อมูลดังต่อไปนี้
//     • สี
//     • ประเภทรถยนต์
//         ◦ รถเก๋ง
//         ◦ รถกระบะ
//         ◦ รถบรรทุก
//     • ประเภทเครื่องยนต์
//         ◦ เบนซิน
//         ◦ ดีเซล
//         ◦ แบตเตอรี่
//     • จำนวนที่นั่งโดยสาร
//     1. ผู้ใช้สามารถสร้างคำสั่งซื้อรถยนต์โดยกำหนดคุณลักษณะได้ตามความต้องการของตนเอง 
//        หลังจากนั้น โปรแกรม Smart Contract จะต้องทำการสร้าง Non-Fungible Token 
//        ให้กับผู้ใช้เพื่อใช้อ้างอิงคำสั่งจอง
//     2. Smart Contract จะต้องสามารถใช้ ID ของ Token นั้น ๆ เพื่อใช้ค้นหาคำสั่งซื้อดังกล่าวได้ในภายหลัง 
//     3. Smart Contract จะต้องมีการกำหนดสิทธิ์ พนักงาน เพื่อให้เรียกใช้คำสั่ง ยืนยันคำสั่งจอง
//     4. Smart Contract จะต้องอนุญาติให้ผู้ใช้สามารถทำการแก้ไขคำสั่งจอง ปรับเปลี่ยนข้อมูลการสั่งจองได้
//        หากคำสั่งจองนั้น ยังไม่ได้ ถูกยืนยันคำสั่งจองโดย พนักงาน

contract SimpleCarOrdering {

    // implementing here...

}