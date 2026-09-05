const { YoutubeTranscript } = require('youtube-transcript');

exports.handler = async (event, context) => {
  // 取得前端傳來的 videoId 參數
  const videoId = event.queryStringParameters.videoId;

  if (!videoId) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // 避免開發時遇到 CORS 問題
      },
      body: JSON.stringify({ error: '請提供有效的影片 ID (videoId)' })
    };
  }

  try {
    // 使用 youtube-transcript 套件抓取字幕資料
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      // 成功時回傳 JSON 字串格式的字幕陣列
      body: JSON.stringify(transcript)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      // 捕捉錯誤並回傳給前端（可能是無字幕或影片受限）
      body: JSON.stringify({ error: '無法取得字幕，該影片可能未提供 CC 字幕。' })
    };
  }
};