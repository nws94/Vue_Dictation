<template>
  <v-container align-center>
  <audio src="../assets/dictation.wav" controls></audio>
 <v-form class="mt-12 pt-4 pr-4 pl-4">
   <div v-for="item in answers" :key="item.question_no"> 
     <span>{{item.question_no + ".  받아쓰기"}}</span>
    <v-text-field 
              label="정답"
              outlined
              v-model="item.question"
              :error="item.error"
              dense>
    </v-text-field>
  </div>
  
     <v-flex class="text-center">
        <v-btn width="270" color="primary" x-large @click="sumbit()">제출</v-btn>
    </v-flex>
 </v-form>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
          <v-card-title class="headline">당신의 점수는?</v-card-title>
          <v-card-text>{{this.score}} 점입니다.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="again()">다시하기</v-btn>
            <v-btn color="green darken-1" text @click="goLecture()">그만하기</v-btn>
          </v-card-actions>
    </v-card>
  </v-dialog>
</v-container>

</template>
<script>
import router from '../router'
export default {
  data: () => ({
    dialog: false,
    score: 0,
    answers: [
      {question_no: 1, question: '', lecture_no: 1, course_no: 1,hint:"",error:false },
      {question_no: 2, question: '', lecture_no: 1, course_no: 1,hint:"",error:false},
      {question_no: 3, question: '',lecture_no: 1, course_no: 1,hint:"",error:false},
      {question_no: 4, question: '',  lecture_no: 1, course_no: 1, hint:"",error:false},
      {question_no: 5, question: '',lecture_no: 1, course_no: 1, hint:"",error:false},
      {question_no: 6, question: '', lecture_no: 1, course_no: 1,hint:"", error:false},
      {question_no: 7, question: '',lecture_no: 1, course_no: 1,hint:"", error:false},
      {question_no: 8, question: '', lecture_no: 1, course_no: 1,hint:"", error:false},
      {question_no: 9, question: '', lecture_no: 1, course_no: 1,hint:"", error:false},
      {question_no: 10, question: '', lecture_no: 1, course_no: 1,hint:"", error:false},
      ],
     
  }),
  methods: {
    sumbit() {

     this.score = 0;
    let i =0;
      this.$http.post('api/enroll/answer', this.answers).then(res => {
        for(let answer of res.data) {
          
          if(answer) {
            this.score += 10;
          }else {
            this.answers[i].error = true;
          }
          i++;
        }
        this.dialog = true;
      }).catch( err => {
        console.log(err);
      })
    
     
    
    },
    again() {
      for(let i in this.answers) {
        this.answers[i].error = false;
        this.answers[i].question = "";
      }
      this.dialog = false
    },
    goLecture() {
      router.push({path: '/readlc'})
    }
  }
}
</script>