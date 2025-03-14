<template>
  <div style="width: 100%" class="mx-4">
    <h1 class="text-center mt-2">카페 추천 & 스트레스 관리</h1>

    <br />

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-card to="/cafe/recommendation/user">
            <v-img
              class="align-end text-white"
              height="200"
              src="https://via.placeholder.com/400x200?text=User+Recommendations"
              cover
            />
            <v-card-title class="text-center">사용자 추천</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" lg="4">
          <v-card to="/cafe/recommendation/admin">
            <v-img
              class="align-end text-white"
              height="200"
              src="https://via.placeholder.com/400x200?text=Expert+Recommendations"
              cover
            />
            <v-card-title class="text-center">전문가 추천</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" lg="4">
          <v-card to="/cafe/recommendation/ai">
            <v-img
              class="align-end text-white"
              height="200"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s"
              cover
            />
            <v-card-title class="text-center">AI 추천</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" lg="4">
          <v-card to="/cafe/stress-management">
            <v-img
              class="align-end text-white"
              height="200"
              src="https://via.placeholder.com/400x200?text=Stress+Management"
              cover
            />
            <v-card-title class="text-center">스트레스 관리법</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.v-card {
  border-radius: 15px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease-in-out;
  text-align: center;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.v-img {
  border-radius: 15px 15px 0 0;
}
</style>
