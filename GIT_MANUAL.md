githubへ登録
===========
git remote add origin git@github.com:<username>/<application_name>.git
git push origin master
 
  
  初期設定
  =======
  git config --global user.name "Foo Bar"
  git config --global user.email "foo@bar.com"
  git config --global color.ui auto
   
   --globalオプションでホームディレクトリの.gitconfigへ書きだされる
    
 
 リポジトリ初期化
 ==============
 git init
  
  ./.git ディレクトリが作成される
   
   基本設定の確認
   ============
   git var GIT_COMMITTER_IDENT
   git var GIT_AUTHOR_IDENT
    
最初のコミット
============
git add .
git commit -m "initial commit"
 
 git diff
 ============
 変更内容の確認
  
  - 変更前の内容 
  + 変更後の内容
   
   git diff
   　ステージングと作業コピーを比較
    
git diff HEAD
　git commit していないすべての変更点を出力
 
 git diff –-staged または --cached
 　ステージされている変更とコミットの内容を比較
  
  git add
  =======
  git add [ファイル名]
  git add -u    => バージョン管理されているファイルを一括でaddする
  git add -A    => バージョン管理されていないファイル（新規ファイル）を一括でaddする
  git add -p    => 部分的にaddする時
   
    
git commit
==========
git commit -m "hogehoge"
　コミットする
 
 git commit -a -m "hogehoge"
 　git add -u, git commit -m を一括で
  
  git commit -m "hogehoge" [ファイル名]
  　指定したファイルのみをコミット
   
   git commit --amend
   　直近のコミットをやりなおし。ファイルをaddし忘れたときなど　
    
 
 git rm
 =======
 git rm  
  ファイル削除
   
   git rm -f 
    ステージングのファイルを強制削除
 
 git rm --cached
  ファイルを残しつつステージングのファイルを削除
   
    
git status
==========
変更内容の要約
 
  
  git show
  ========
  コミットのログメッセージと変更内容が出力される
   
    
git reset
=========
git reset [ファイル名]
　次のコミットに含みたくないファイルを指定
 
 git reset
 　すべてのaddしてきた物を指定したのと同じ
  
  git reset HEAD^
  　最新のコミットを捨てる（一つ前のHEADに戻る）
   
    
 
 git revert
 ===========
 git revert [コミットオブジェクト]  => 過去のコミットを打ち消す
  
   
   git filter-branch
   ==================
   全コミットからのファイル削除
   git filter-branch --tree-filter 'rm -f passwords.txt' HEAD
    
 
 git log
 =======
 変更履歴をみる
  
  git log -<数字>  
   出力するコミット数を制限
    
git log -p
 diffを表示
  
  git log --decorate
  タグやブランチを表示する
   
    
git checkout
=============
git checkout [PATH] => インデックスに記録されている状態に復帰
git checkout HEAD [PATH] => 最新のコミットに記録されたファイルに復帰
 
 git tag
 ========
 git tag [タグ名] 
  
   
   .gitignore
   ==========
   .gitignoreファイルにバージョン管理の対象としないファイルを書く
    
 
 バックアップ用リポジトリの作成
 ==========================
 mkdir -p /repository/hoge.git
 cd /repository/hoge.git
 git --bare init  => --bare ワークツリーなしでリポジトリを作成するという意味
  
  ワークディレクトリにもどって
  git push /repository/hoge.git master
   
    
git clone
=========
バックアップからコピーしてくる
 
 git clone /repository/hoge.git hoge
  
  git push
  ========
  元のリポジトリにブランチをすべて転送
  git push  => git push origin master と同じ
  git push --tags => tagをpush
   
   git pull
   ========
   origin から最新のコミットを取得
    
 
 git remote
 ==========
 git remote add [name] [url]
 リモートリポジトリを追加する
  
  git remote show [name]
  リモートリポジトリの調査
   
    
ブランチを作る
============
git branch [ブランチ名]
git checkout [ブランチ名]
 
 git checkout -b [ブランチ名] => 上記を一括で行う
  
  git branch
  ===========
  git branch
   自分がどのブランチにいるかを知る
    
git branch　[ブランチ名]
　ブランチを作る
 
 git branch -d [ブランチ名]
 　ブランチを削除
  
   
   git checkout
   ============
   git checkout [ブランチ名] => ブランチを切り替える
    
git merge
=========
git merge [ブランチ名]
 ブランチとマージ
  
  git merge --no-ff [ブランチ名]
   ブランチのコミット履歴を取り込みマージ
    
git branch --merged
 マージしたブランチを表示。git merge -d　で消せるようになる
  
  git branch --no-merged
   マージされていないブランチを表示
    
git branch -D 
 ブランチを強制削除
  
   
   git submodule
   =============
   git submodule add [uri] [dir]
   git submodule status
   git submodule init
   git submodule update
    
 
  
  流れ
  ====
  git clone [url]
  cd project
  git checkout -b featureA
  git commit
  git rebase -i (rebaseでコミットをひとつにまとめる時）
  git remote add myfork [url]
  git push myfork featureA
  git request-pull origin/master myfork (commiterに送る時の変更概要表示）
  ------------------
  (origin/masterが変更されてた時、rebaseする）
  git fetch origin
  git checkout featureA
  git rebase origin/master
  git push -f myfork featureA (強制pushする)
  -------------------
  (チョコ変更するとき)
  git checkout -b featrueAv2 origin/master
  git merge --no-commit --squash featureA
  (--squash オプションは、マージしたいブランチでのすべての作業をひとつのコミットにまとめ、それを現在のブランチの先頭にマージします。--no-commit オプションは、自動的にコミットを記録しないよう Git に指示しています。こうすれば、別のブランチのすべての変更を取り込んでさらに手元で変更を加えたものを新しいコミットとして記録できるのです。)
  git commit
  git push myfork featureAv2
   
    
 
 マージ作業
 =========
 トリプルドット
 git diff master...[ブランチ名]
 (ブランチがmasterからブランチした時の分岐点とのdiffを表示する. git diffのみだと
 masterの最新との比較がされるため。ふたつの参照のうちどちらか一方からのみたどれるコミット (つまり、両方からたどれるコミットは含まない) を指定します）
  
  ダブルドット
  git diff master..[ブランチ名]
  ブランチ名からはたどれるけれど、master からはたどれないすべてのコミット
