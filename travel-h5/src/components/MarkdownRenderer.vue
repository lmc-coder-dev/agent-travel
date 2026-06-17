<template>
  <div class="markdown-content" :class="{ 'ai-markdown': isAiMessage }">
    <div v-html="renderedContent"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  isAiMessage: {
    type: Boolean,
    default: false
  }
})

// 简单的Markdown渲染器
const renderedContent = computed(() => {
  let html = props.content

  // 转义HTML标签（防止XSS）
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // 处理代码块（```）
  html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
    return `<pre class="code-block"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`
  })

  // 处理行内代码（`）
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

  // 处理粗体（**）
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // 处理斜体（*）
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // 处理标题
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')

  // 处理链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // 处理无序列表
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // 处理有序列表
  html = html.replace(/^\d+\. (.*)$/gm, '<li>$1</li>')

  // 处理引用
  html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')

  // 处理分割线
  html = html.replace(/^---$/gm, '<hr>')

  // 处理换行
  html = html.replace(/\n/g, '<br>')

  // 清理多余的br标签
  html = html.replace(/<br><br>/g, '<br>')

  return html
})
</script>

<style scoped>
/* ========================================
   Markdown 渲染器 — 海洋蓝 · 欧式极简
   与 consultation 页面的设计令牌保持一致
   ======================================== */
.markdown-content {
  /* ---- 本地令牌（与父级 consultation 同源） ---- */
  --md-primary: #5A9CC0;
  --md-primary-soft: #7DB8D4;
  --md-primary-deep: #3A7A9E;
  --md-primary-mist: #EBF3F9;

  --md-text-primary: #2C4A5E;
  --md-text-secondary: #5A7D8C;
  --md-text-muted: #8DA4B0;

  --md-surface: #FFFFFF;
  --md-border: rgba(90, 156, 192, 0.10);
  --md-border-soft: rgba(90, 156, 192, 0.08);

  --md-code-bg: #1A2E3F;
  --md-code-surface: rgba(26, 46, 63, 0.06);

  --md-radius-sm: 6px;
  --md-radius-md: 10px;
  --md-radius-lg: 14px;

  --md-ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* ---- 继承父级文字颜色，保证深浅模式一致 ---- */
  color: var(--md-text-primary);
  line-height: 1.72;
  font-size: 14px;
  letter-spacing: 0.01em;
  word-break: break-word;
}

/* ========================================
   段落
   ======================================== */
.markdown-content p {
  margin: 0.65em 0;
}

.markdown-content p:first-child {
  margin-top: 0;
}

.markdown-content p:last-child {
  margin-bottom: 0;
}

/* ========================================
   标题 — 清晰克制，呼吸感间距
   ======================================== */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin: 1.2em 0 0.45em 0;
  font-weight: 620;
  line-height: 1.35;
  letter-spacing: 0.02em;
  color: var(--md-text-primary);
}

.markdown-content h1:first-child,
.markdown-content h2:first-child,
.markdown-content h3:first-child {
  margin-top: 0;
}

.markdown-content h1 {
  font-size: 1.45em;
  padding-bottom: 0.4em;
  border-bottom: 1px solid var(--md-border);
  position: relative;
}

/* 标题下划线装饰 — 海洋蓝渐变短线段 */
.markdown-content h1::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 2.2em;
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--md-primary), var(--md-primary-soft));
}

.markdown-content h2 {
  font-size: 1.22em;
  color: var(--md-text-primary);
}

.markdown-content h3 {
  font-size: 1.06em;
  color: var(--md-text-secondary);
}

/* ========================================
   列表 — 留白舒展，标记柔和
   使用 ::before 自定义标记，完全掌控定位
   ======================================== */
.markdown-content ul,
.markdown-content ol {
  margin: 0.6em 0;
  padding-left: 0;
  list-style: none;
}

.markdown-content li {
  margin: 0.25em 0;
  padding-left: 1.5em;
  position: relative;
}

/* ---- 无序列表标记 ---- */
.markdown-content ul li::before {
  content: '•';
  position: absolute;
  left: 0.3em;
  color: var(--md-primary-soft);
  font-weight: 600;
}

/* ---- 有序列表标记 ---- */
.markdown-content ol {
  counter-reset: md-ol;
}
.markdown-content ol li::before {
  counter-increment: md-ol;
  content: counter(md-ol) '.';
  position: absolute;
  left: 0;
  color: var(--md-primary-soft);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

/* ========================================
   引用块 — 如海风轻拂，清透克制
   ======================================== */
.markdown-content blockquote {
  border-left: 3px solid var(--md-primary-soft);
  margin: 0.85em 0;
  padding: 0.6em 0.9em 0.6em 1em;
  color: var(--md-text-secondary);
  font-style: italic;
  background: linear-gradient(90deg, var(--md-primary-mist) 0%, rgba(235, 243, 249, 0.3) 100%);
  border-radius: 0 var(--md-radius-sm) var(--md-radius-sm) 0;
  position: relative;
}

/* AI 消息中的引用块 — 更明显的蓝色调 */
.ai-markdown blockquote {
  border-left-color: var(--md-primary);
  background: linear-gradient(90deg, rgba(90, 156, 192, 0.07) 0%, rgba(90, 156, 192, 0.02) 100%);
}

/* ========================================
   分割线 — 细密如雾，若有似无
   ======================================== */
.markdown-content hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--md-border-soft) 20%, var(--md-primary-soft) 50%, var(--md-border-soft) 80%, transparent 100%);
  margin: 1.6em 0;
}

/* ========================================
   行内代码 — 清浅温和，融入文字流
   ======================================== */
.markdown-content code.inline-code {
  background: rgba(90, 156, 192, 0.07);
  padding: 0.15em 0.45em;
  border-radius: var(--md-radius-sm);
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Monaco', 'Menlo', monospace;
  font-size: 0.88em;
  color: var(--md-primary-deep);
  font-weight: 480;
  border: 1px solid rgba(90, 156, 192, 0.10);
}

.ai-markdown code.inline-code {
  background: rgba(58, 122, 158, 0.08);
  color: var(--md-primary-deep);
}

/* ========================================
   代码块 — 深海之夜，沉稳专业
   ======================================== */
.markdown-content pre.code-block {
  background: var(--md-code-bg);
  color: #E2ECF2;
  padding: 1.05em 1.15em;
  border-radius: var(--md-radius-md);
  overflow-x: auto;
  margin: 0.9em 0;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Monaco', 'Menlo', monospace;
  font-size: 0.84em;
  line-height: 1.55;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow:
    0 1px 0 rgba(90, 156, 192, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  position: relative;
}

.markdown-content pre.code-block code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

/* 滚动条 — 细窄清透 */
.markdown-content pre.code-block::-webkit-scrollbar {
  height: 4px;
}

.markdown-content pre.code-block::-webkit-scrollbar-track {
  background: transparent;
}

.markdown-content pre.code-block::-webkit-scrollbar-thumb {
  background: rgba(125, 184, 212, 0.3);
  border-radius: 2px;
}

/* ========================================
   链接 — 轻触涟漪，克制优雅
   ======================================== */
.markdown-content a {
  color: var(--md-primary);
  text-decoration: none;
  border-bottom: 1px solid rgba(90, 156, 192, 0.25);
  transition: border-color 0.2s var(--md-ease-out), color 0.2s var(--md-ease-out);
  padding-bottom: 1px;
}

.markdown-content a:hover {
  color: var(--md-primary-deep);
  border-bottom-color: var(--md-primary);
}

.ai-markdown a {
  color: var(--md-primary-deep);
  border-bottom-color: rgba(58, 122, 158, 0.22);
}

.ai-markdown a:hover {
  color: #1E5A78;
  border-bottom-color: var(--md-primary-deep);
}

/* ========================================
   粗体 & 斜体 — 语义化轻重对比
   ======================================== */
.markdown-content strong {
  font-weight: 620;
  color: var(--md-text-primary);
}

.ai-markdown strong {
  color: var(--md-primary-deep);
}

.markdown-content em {
  font-style: italic;
  color: var(--md-text-secondary);
}

/* ========================================
   图片 — 自适应，柔和圆角
   ======================================== */
.markdown-content :deep(img) {
  max-width: 100%;
  border-radius: var(--md-radius-sm);
  margin: 0.6em 0;
}

/* ========================================
   表格 — 简约线条，清晰可读（预留）
   ======================================== */
.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.8em 0;
  font-size: 0.92em;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  padding: 0.5em 0.75em;
  text-align: left;
  border-bottom: 1px solid var(--md-border);
}

.markdown-content :deep(th) {
  font-weight: 600;
  color: var(--md-text-primary);
  font-size: 0.9em;
  letter-spacing: 0.02em;
}

.markdown-content :deep(td) {
  color: var(--md-text-secondary);
}
</style>





