<template>
  <div class="mx-4">
    <div class="my-3">
      <v-card v-if="content?.anonymous" elevation="0">
        <v-card-subtitle>
          <v-icon start>mdi-incognito</v-icon>
          비공개
        </v-card-subtitle>
      </v-card>
      <v-card v-else :title="content?.userInfo?.displayName" elevation="0">
        <template v-slot:prepend>
          <v-avatar>
            <v-img :src="content?.userInfo?.photoURL"></v-img>
          </v-avatar>
        </template>
      </v-card>
    </div>

    <h1 class="mx-3 mt-5">{{ content?.title }}</h1>

    <p class="mx-3 text-justify">{{ content?.content }}</p>

    <br />

    <div class="d-flex">
      <v-col v-if="userInfo" cols="6">
        <v-btn block color="red" variant="outlined" @click="like_or_unlike">
          <v-icon v-if="!liked">mdi-heart-outline</v-icon>
          <v-icon v-else>mdi-heart</v-icon>
        </v-btn>
      </v-col>
      <v-col :cols="userInfo ? 6 : 12">
        <v-btn block color="primary" variant="outlined">
          <v-icon start>mdi-comment</v-icon>
          {{ Object.keys(content?.comments ?? {}).length }}
        </v-btn>
      </v-col>
    </div>

    <br /><br />

    <div v-if="userInfo" class="comment-container">
      <v-textarea
        v-model="comment"
        variant="outlined"
        label="댓글 달기"
        append-icon="mdi-send"
        @click:append="send"
      ></v-textarea>
      <v-checkbox
        v-model="anonymous"
        label="비공개로 댓글 달기"
        style="margin-bottom: -20px"
      ></v-checkbox>
    </div>

    <br /><br />

    <div>
      <v-card
        v-for="comment in comments"
        :key="comment.time"
        variant="outlined"
        class="mb-2"
      >
        <template v-slot:prepend>
          <v-avatar size="20">
            <v-icon v-if="comment.anonymous" size="sm">mdi-incognito</v-icon>
            <v-img v-else :src="comment?.userInfo?.photoURL"></v-img>
          </v-avatar>
          <p class="ml-2">
            {{ comment.anonymous ? "비공개" : comment.userInfo.displayName }}
          </p>
        </template>

        <v-card-text>
          <v-list-item-title>{{ comment.comment }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ new Date(comment.time).toLocaleDateString() }}
          </v-list-item-subtitle>
        </v-card-text>
      </v-card>
    </div>

    <v-fab
      v-if="userInfo?.uid === content?.userInfo?.uid"
      location="bottom end"
      size="35"
      color="#FFEAE4"
      absolute
      app
      appear
      icon="mdi-delete"
      @click="delete_content"
    ></v-fab>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue, set, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const router = useRouter();
const route = useRoute();
const variety = route.query.variety;
const time = route.query.time;

const content = ref({});
const userInfo = ref({});
const comments = ref([]);

const liked = ref(false);
const anonymous = ref(false);
const comment = ref("");

const { $db, $auth } = useNuxtApp();

onMounted(async () => {
  await onAuthStateChanged($auth, (user) => {
    userInfo.value = user;

    if (userInfo.value) {
      const liked_db = dbRef(
        $db,
        `/community/share-emotion/${variety}/${time}/liked/${userInfo.value.uid}`
      );
      onValue(liked_db, (snapshot) => {
        liked.value = snapshot.val();
      });
    }
  });

  const db = dbRef($db, `/community/share-emotion/${variety}/${time}`);
  const comments_db = dbRef(
    $db,
    `/community/share-emotion/${variety}/${time}/comments`
  );
  onValue(db, (snapshot) => {
    content.value = snapshot.val();
  });
  onValue(comments_db, (snapshot) => {
    comments.value = snapshot.val();
  });
});

function like() {
  const db = dbRef(
    $db,
    `/community/share-emotion/${variety}/${time}/liked/${userInfo.value.uid}`
  );
  set(db, true);
  liked.value = true;
}
function unlike() {
  const db = dbRef(
    $db,
    `/community/share-emotion/${variety}/${time}/liked/${userInfo.value.uid}`
  );
  remove(db);
  liked.value = false;
}
function like_or_unlike() {
  if (liked.value) unlike();
  else like();
}

function send() {
  const time_comment = new Date().getTime();
  const db = dbRef(
    $db,
    `/community/share-emotion/${variety}/${time}/comments/${time_comment}`
  );
  set(db, {
    comment: comment.value,
    anonymous: anonymous.value,
    time: time_comment,
    userInfo: {
      photoURL: userInfo.value.photoURL,
      displayName: userInfo.value.displayName,
      email: userInfo.value.email,
    },
  });
  comment.value = "";
}

function delete_content() {
  const db = dbRef($db, `/community/share-emotion/${variety}/${time}`);
  remove(db);
  router.push("/community");
}
</script>

<style scoped>
.v-btn {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.v-btn:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

.v-icon {
  font-size: 1.2rem;
}

.v-avatar {
  margin-right: 10px;
}

.v-avatar[size="20"] {
  width: 20px;
  height: 20px;
}

.v-card {
  margin-bottom: 16px;
  border-radius: 10px;
}

.v-card-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.v-card-text {
  display: flex;
  flex-direction: column;
}

.v-list-item-title {
  font-weight: bold;
  font-size: 1rem;
}

.v-list-item-subtitle {
  font-size: 0.8rem;
  color: #666;
}

.v-textarea {
  margin-bottom: 8px;
}

.v-checkbox {
  margin-top: -8px;
}
.comment-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.custom-textarea {
  margin-bottom: 20px;
}

.v-textarea .v-input__control {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  padding: 10px;
}

.v-textarea .v-label {
  color: #424242;
  font-weight: 600;
}

.v-checkbox .v-label {
  color: #424242;
  font-weight: 500;
}

.custom-checkbox {
  margin-top: 10px;
  color: #424242;
}

.custom-checkbox .v-input--selection-controls__ripple {
  color: #1976d2; /* Change to your desired color */
}
</style>
