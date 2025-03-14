<template>
  <div class="mx-4">
    <div v-if="mypersonality.length > 0">
      <div class="section-title">당신의 성격 유형</div>
      <p>
        당신은
        <span v-for="personality in mypersonality" :key="personality">
          <a :href="`#${personality}`"> {{ personality }}</a
          >, &nbsp;
        </span>
        성격을 가진 사람입니다.
      </p>
    </div>

    <div id="유연한 성격" v-if="mypersonality.includes('유연한 성격')">
      <div class="section-title">유연한 성격</div>
      <table>
        <tr>
          <th colspan="2">설명</th>
        </tr>
        <tr>
          <td colspan="2">
            유연한 성격은 새로운 상황에서 열린 마음을 가지고 적응하여, 변화에
            대한 저항력이 적고 의견이나 상황을 수용할 수 있는 능력을 의미한다.
          </td>
        </tr>
        <tr>
          <th colspan="2">결과</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                상황에 따라 적응력이 뛰어나며, 새로운 환경이나 상황에 빠르게
                적응할 수 있습니다.
              </li>
              <li>
                타인의 의견이나 아이디어를 존중하고 수용하는 경향이 있습니다.
              </li>
              <li>
                예상치 못한 변화에 대한 두려움보다는 새로운 경험을 즐기며
                받아들입니다.
              </li>
              <li>
                일상적인 루틴에 과도하게 얽매이지 않고, 새로운 도전을 즐깁니다.
              </li>
              <li>
                다양한 사람들과 소통하는 것을 즐기며, 새로운 사람들을 만나기를
                좋아합니다.
              </li>
              <li>
                문제 해결 시 다양한 방법과 관점을 고려하며 융통성을 발휘합니다.
              </li>
              <li>
                예상치 못한 상황에 직면했을 때도 긍정적인 태도를 유지하며
                해결책을 찾습니다.
              </li>
              <li>
                자유롭고 유연한 사고 방식을 가지고 있어, 새로운 아이디어를
                자유롭게 받아들이고 시도합니다.
              </li>
              <li>
                갈등 상황에서도 상황을 잘 관리하고, 타협을 통해 해결책을
                찾으려고 노력합니다.
              </li>
              <li>
                자신의 생각이나 행동을 유연하게 조절하며, 상황에 따라 적절하게
                대처합니다.
              </li>
              <li>
                새로운 상황에 대해 열린 마음을 가지고 있으며, 변화에 대한 저항이
                적습니다.
              </li>
              <li>
                타인의 의견이나 상황을 수용할 수 있는 능력이 뛰어나며, 예상치
                못한 변화에도 긍정적으로 대처합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">주요 특징</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>적응력:</strong> 상황에 따라 빠르게 적응하며, 새로운
                환경이나 상황에 잘 적응합니다. 일상적인 루틴에 과도하게 얽매이지
                않고, 변화에 유연하게 대처합니다.
              </li>
              <li>
                <strong>타인의 의견 존중:</strong> 타인의 의견이나 아이디어를
                존중하고 수용하는 경향이 있습니다. 다양한 사람들과 소통하는 것을
                즐기며, 새로운 사람들을 만나기를 좋아합니다.
              </li>
              <li>
                <strong>변화를 즐김:</strong> 예상치 못한 변화에 대한
                두려움보다는 새로운 경험을 즐기며 받아들입니다. 새로운 도전을
                즐기며, 자유롭고 유연한 사고 방식을 가지고 있습니다.
              </li>
              <li>
                <strong>문제 해결 능력:</strong> 문제 해결 시 다양한 방법과
                관점을 고려하며 융통성을 발휘합니다. 갈등 상황에서도 상황을 잘
                관리하고, 타협을 통해 해결책을 찾으려고 노력합니다.
              </li>
              <li>
                <strong>긍정적인 태도:</strong> 예상치 못한 상황에 직면했을 때도
                긍정적인 태도를 유지하며 해결책을 찾습니다. 자유롭고 유연한 사고
                방식을 가지고 있어, 새로운 아이디어를 자유롭게 받아들이고
                시도합니다.
              </li>
              <li>
                <strong>조절 능력:</strong> 자신의 생각이나 행동을 유연하게
                조절하며, 상황에 따라 적절하게 대처합니다. 다양한 상황에서
                유연하게 대처하는 능력이 뛰어나며, 새로운 상황에 쉽게
                적응합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">강점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>적응력:</strong> 새로운 환경이나 상황에 빠르게 적응하는
                능력이 뛰어납니다.
              </li>
              <li>
                <strong>융통성:</strong> 다양한 상황에서 융통성을 발휘하여
                문제를 해결합니다.
              </li>
              <li>
                <strong>개방성:</strong> 새로운 아이디어와 경험을 기꺼이
                받아들입니다.
              </li>
              <li>
                <strong>갈등 해결:</strong> 갈등 상황에서 타협을 통해 해결책을
                찾는 능력이 뛰어납니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">개선할 점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>결정력:</strong> 때로는 결정을 내릴 때 과도하게 유연성을
                발휘하여 우유부단해질 수 있습니다. 중요한 순간에는 결단력을
                가지는 것이 필요합니다.
              </li>
              <li>
                <strong>일관성:</strong> 너무 많은 변화와 새로운 시도를 하다
                보면 일관성을 유지하는 데 어려움을 겪을 수 있습니다. 목표와
                방향성을 유지하는 것이 중요합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">추천 활동</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                새로운 도전: 다양한 분야에서 새로운 도전을 시도해 보세요. 새로운
                경험은 당신에게 큰 만족감을 줄 것입니다.
              </li>
              <li>
                의견 교환: 다양한 사람들과 의견을 교환하고, 새로운 아이디어를
                받아들이는 활동에 참여해 보세요.
              </li>
              <li>
                갈등 해결 연습: 갈등 상황에서 타협을 통해 해결책을 찾는 연습을
                해보세요. 이는 당신의 유연성을 더욱 강화할 것입니다.
              </li>
              <li>
                여행: 새로운 환경과 문화를 경험하는 여행은 당신의 적응력을 더욱
                향상시킬 수 있습니다.
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>

    <div id="활발한 성격" v-if="mypersonality.includes('활발한 성격')">
      <div class="section-title">활발한 성격</div>
      <table>
        <tr>
          <th colspan="2">설명</th>
        </tr>
        <tr>
          <td colspan="2">
            당신은 외향적이고 활발한 성격을 가진 사람입니다. 사람들과의
            상호작용을 통해 에너지를 얻으며, 사회적인 활동과 다양한 경험을
            즐깁니다. 긍정적이고 적극적인 태도로 주변 사람들에게 활기를 불어넣는
            능력을 가지고 있습니다. 외향적이고 활발한 성격을 가진 당신은
            사람들과의 상호작용을 통해 에너지를 얻고, 긍정적이고 활동적인 삶을
            추구합니다. 이 성격 유형은 리더십, 커뮤니케이션, 적응력 등의 강점을
            지니고 있으며, 다양한 사회적 및 활동적 환경에서 큰 성과를 거둘 수
            있습니다. 다만, 균형 있는 생활과 자기 성찰의 중요성을 잊지 말고,
            자신의 에너지를 효율적으로 관리하는 것이 필요합니다.
          </td>
        </tr>
        <tr>
          <th colspan="2">주요 특징</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>사회적 활동을 즐김:</strong> 사람들과의 만남과 대화를
                통해 에너지를 얻습니다. 새로운 사람들을 만나는 것을 즐기며,
                네트워킹에 능합니다.
              </li>
              <li>
                <strong>긍정적이고 낙천적임:</strong> 어려운 상황에서도 긍정적인
                태도를 유지하려고 노력합니다. 다른 사람들에게 희망과 용기를
                북돋워주는 역할을 합니다.
              </li>
              <li>
                <strong>활동적이고 에너제틱함:</strong> 정적인 것보다 동적인
                활동을 선호합니다. 다양한 활동에 참여하며, 바쁘고 역동적인
                생활을 즐깁니다.
              </li>
              <li>
                <strong>팀워크를 중시함:</strong> 팀 프로젝트나 그룹 활동에서
                뛰어난 협력 능력을 발휘합니다. 다른 사람들과 함께 일하는 것을
                즐기며, 조화를 이루는 데 능합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">강점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>리더십:</strong> 자연스럽게 사람들을 이끌고 동기부여하는
                능력이 있습니다.
              </li>
              <li>
                <strong>커뮤니케이션:</strong> 명확하고 효과적인 의사소통 능력을
                가지고 있습니다.
              </li>
              <li>
                <strong>적응력:</strong> 새로운 상황이나 환경에 빠르게 적응하는
                능력이 뛰어납니다.
              </li>
              <li>
                <strong>문제 해결:</strong> 문제를 긍정적으로 바라보고, 창의적인
                해결책을 찾는 데 능숙합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">개선할 점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>과도한 활동:</strong> 때로는 너무 많은 활동에 참여하여
                피로를 느낄 수 있습니다. 적절한 휴식과 균형이 필요합니다.
              </li>
              <li>
                <strong>집중력:</strong> 여러 가지 일을 동시에 시도하기보다는
                중요한 일에 집중하는 것이 필요합니다.
              </li>
              <li>
                <strong>자기 반성:</strong> 활발한 성격으로 인해 때때로 자기
                성찰의 시간을 놓칠 수 있습니다. 정기적으로 자신의 감정과 생각을
                돌아보는 것이 중요합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">추천 활동</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                사회적 이벤트: 친구들과의 모임, 파티, 네트워킹 이벤트에
                참석하기.
              </li>
              <li>
                스포츠 및 야외 활동: 팀 스포츠, 하이킹, 여행 등 활동적인 취미
                즐기기.
              </li>
              <li>리더십 역할: 동아리나 조직에서 리더 역할 맡기.</li>
              <li>
                봉사 활동: 자원봉사나 사회 봉사 활동에 참여하여 에너지를 나누기.
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>

    <div id="마이웨이" v-if="mypersonality.includes('마이웨이')">
      <div class="section-title">마이웨이성격</div>
      <table>
        <tr>
          <th colspan="2">설명</th>
        </tr>
        <tr>
          <td colspan="2">
            마이웨이성격을 가진 사람은 자기만의 사고를 가지고 있으며, 주관적인
            기준에 따라 행동하는 경향이 있습니다. 아래는 마이웨이성격을 가진
            사람의 일반적인 특징들입니다.
          </td>
        </tr>
        <tr>
          <th colspan="2">결과</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                다른 사람의 의견이나 규칙보다 자신의 생각을 우선시하는 경향이
                있습니다.
              </li>
              <li>
                자신이 세운 목표를 달성하기 위해 노력하고, 이를 위해 자신만의
                방법과 전략을 고수합니다.
              </li>
              <li>
                주관적인 판단에 따라 결정을 내리며, 자신의 선택을 후회하지 않는
                경향이 있습니다.
              </li>
              <li>
                자신의 신념이나 가치에 따라 타협하기 어려울 수 있으며, 타인의
                의견을 수용하기보다는 자신의 관점을 중시합니다.
              </li>
              <li>
                독립적인 사고 방식을 통해 새로운 아이디어를 생성하거나 문제를
                해결하는 데 능숙할 수 있습니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">주요 특징</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>독립적 사고:</strong> 다른 사람의 의견이나 규칙보다
                자신의 생각을 우선시합니다.
              </li>
              <li>
                <strong>목표 지향성:</strong> 자신이 세운 목표를 달성하기 위해
                노력하고, 이를 위해 자신만의 방법과 전략을 고수합니다.
              </li>
              <li>
                <strong>결정력:</strong> 주관적인 판단에 따라 결정을 내리며,
                자신의 선택을 후회하지 않는 경향이 있습니다.
              </li>
              <li>
                <strong>타협 어려움:</strong> 자신의 신념이나 가치에 따라
                타협하기 어려울 수 있으며, 타인의 의견을 수용하기보다는 자신의
                관점을 중시합니다.
              </li>
              <li>
                <strong>창의적 사고:</strong> 독립적인 사고 방식을 통해 새로운
                아이디어를 생성하거나 문제를 해결하는 데 능숙할 수 있습니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">강점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong
                  >목표를 달성하기 위해 끈질기고 자기주장이 강하다.</strong
                >
              </li>
              <li>
                <strong
                  >새로운 아이디어를 발생시키고 독창적인 접근을 취한다.</strong
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">개선할 점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong
                  >타인과의 협력이나 타협에 있어 어려움을 겪을 수 있다.</strong
                >
              </li>
              <li>
                <strong
                  >다른 사람의 의견을 고려하지 않고 자신의 방식을 고수할 수
                  있다.</strong
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">추천 활동</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                목표 설정과 계획 수립: 자신의 목표를 명확히 설정하고, 달성을
                위한 구체적인 계획을 세워보세요. 이는 자신의 결정력을 더욱
                강화시킬 수 있습니다.
              </li>
              <li>
                타인과의 협력 강화: 타인의 다양한 관점을 이해하고 수용하는 데
                노력해보세요. 협력과 공감은 새로운 아이디어를 발전시키는 데
                도움을 줄 수 있습니다.
              </li>
              <li>
                창의적 문제 해결: 문제에 대해 다양한 관점에서 접근하고, 기존의
                방식에서 벗어나 새로운 해결책을 찾아보세요. 이는 자신의 창의적
                사고력을 증진시킬 수 있습니다.
              </li>
              <li>
                자기 개발 활동: 자기 개발 서적을 읽거나 세미나에 참여하여 자신의
                역량을 발전시키는 데 집중해보세요. 이는 당신의 독립적이고 목표
                지향적인 성향을 더욱 강화할 수 있습니다.
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>

    <div id="한발자국" v-if="mypersonality.includes('한발자국')">
      <div class="section-title">한 발자국성격</div>
      <table>
        <tr>
          <th colspan="2">설명</th>
        </tr>
        <tr>
          <td colspan="2">
            한 발자국성격을 가진 사람은 다른 사람에 비해 적응하는 속도가 조금
            느리고, 처음에는 곁에서 지켜보는 경향이 있습니다. 그러나 시간이
            지날수록 안정감을 느끼며 행동하는 성향을 가지고 있습니다.
          </td>
        </tr>
        <tr>
          <th colspan="2">결과</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                새로운 환경이나 사람들과 친밀해지는 데 시간이 조금 필요할 수
                있습니다. 처음에는 조용하게 관찰하고 배우는 것을 선호합니다.
              </li>
              <li>
                변화보다는 안정된 환경과 상황을 선호합니다. 시간이 지날수록
                익숙함과 안정감을 중요시하게 됩니다.
              </li>
              <li>
                결정을 내리기 전에 신중하게 사고하며, 자신의 선택이나 행동에
                대해 깊이 고민하는 경향이 있습니다.
              </li>
              <li>
                다른 사람들과의 깊은 연결과 신뢰를 중요시하며, 오랜 기간 동안
                진정한 친구나 파트너를 만드는 데 관심이 많습니다.
              </li>
              <li>
                일정한 규칙과 안정적인 환경에서 자신의 역량을 향상시키고, 신뢰할
                수 있는 사람들과 협력하는 것을 선호합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">주요 특징</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong>느린 적응력:</strong> 새로운 환경이나 사람들과
                친밀해지는 데 시간이 조금 필요할 수 있습니다. 처음에는 조용하게
                관찰하고 배우는 것을 선호합니다.
              </li>
              <li>
                <strong>안정을 중시:</strong> 변화보다는 안정된 환경과 상황을
                선호합니다. 시간이 지날수록 익숙함과 안정감을 중요시하게 됩니다.
              </li>
              <li>
                <strong>사려 깊음:</strong> 결정을 내리기 전에 신중하게
                사고하며, 자신의 선택이나 행동에 대해 깊이 고민하는 경향이
                있습니다.
              </li>
              <li>
                <strong>신뢰와 친밀감:</strong> 다른 사람들과의 깊은 연결과
                신뢰를 중요시하며, 오랜 기간 동안 진정한 친구나 파트너를 만드는
                데 관심이 많습니다.
              </li>
              <li>
                <strong>안정된 환경에서의 성장:</strong> 일정한 규칙과 안정적인
                환경에서 자신의 역량을 향상시키고, 신뢰할 수 있는 사람들과
                협력하는 것을 선호합니다.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">강점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong
                  >신중하고 조심스러운 성품으로 신뢰받고 안정감을 제공할 수
                  있습니다.</strong
                >
              </li>
              <li>
                <strong
                  >오랜 기간 동안 지속적인 관계를 형성하며 신뢰를 쌓을 수
                  있습니다.</strong
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">개선할 점</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                <strong
                  >초기에는 소극적으로 비추어질 수 있고, 변화에 대한 적응이 다소
                  느릴 수 있습니다.</strong
                >
              </li>
              <li>
                <strong
                  >너무 안정과 친숙함에 집착할 경우 새로운 경험의 기회를 놓칠 수
                  있습니다.</strong
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">추천 활동</th>
        </tr>
        <tr>
          <td colspan="2">
            <ul>
              <li>
                새로운 경험 탐색: 처음에는 어색하더라도 새로운 환경과 사람들을
                경험해 보세요. 이는 적응력을 향상시키고 새로운 관계를 형성하는
                데 도움이 될 수 있습니다.
              </li>
              <li>
                자신의 감정과 생각 공유: 다른 사람들과 자신의 감정과 생각을
                공유함으로써 신뢰를 쌓고 더 깊은 연결을 만들 수 있습니다.
              </li>
              <li>
                변화 수용 연습: 작은 변화부터 시도하여 변화에 대한 두려움을
                극복하고 적응력을 높여보세요. 이는 새로운 기회를 발견하는 데
                도움이 될 수 있습니다.
              </li>
              <li>
                자기 계발 활동: 자신이 좋아하는 취미나 관심사를 통해 새로운
                기술을 배우고 성장해보세요. 이는 자신의 안정적인 성향을 활용하여
                지속적인 성장을 이룰 수 있습니다.
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const { $auth, $db } = useNuxtApp();
const route = useRoute();

const elasticity = Number(route.query.elasticity);
const excited = Number(route.query.excited);
const myway = Number(route.query.myway);
const onestep = Number(route.query.onestep);

const mypersonality = ref([]);

onMounted(() => {
  // Compare elasticity, excited, myway, onestep and get the biggest value, and the text accordingly
  let max = Math.max(elasticity, excited, myway, onestep);

  if (max === elasticity) {
    mypersonality.value.push("유연한 성격");
  }

  if (max === excited) {
    mypersonality.value.push("활발한 성격");
  }

  if (max === myway) {
    mypersonality.value.push("마이웨이");
  }

  if (max === onestep) {
    mypersonality.value.push("한발자국");
  }

  onAuthStateChanged($auth, (user) => {
    if (user) {
      const uid = user.uid;
      const personalityRef = dbRef($db, `users/${uid}/personality`);
      set(personalityRef, mypersonality.value);
    }
  });
});
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  vertical-align: top;
}
th {
  background-color: #f4f4f4;
}
.section-title {
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 10px;
}
ul {
  padding-left: 20px;
  margin: 0;
}
li {
  margin-bottom: 5px;
}
</style>
